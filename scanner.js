const video = document.getElementById("camera");
const statusBox = document.getElementById("status");
const resultBox = document.getElementById("scan-result");
const countBox = document.getElementById("scan-count");
const startButton = document.getElementById("start-button");
const exitButton = document.getElementById("exit-button");

const codeReader = new ZXing.BrowserMultiFormatReader();

let scanCount = 0;
let lastCode = "";
let lastScanTime = 0;
let scannerRunning = false;
let audioContext;

startButton.addEventListener("click", startScanner);
exitButton.addEventListener("click", exitScanner);

async function startScanner() {
  if (scannerRunning) return;

  // Starting audio from a button press allows sound on iPhone.
  audioContext = new (
    window.AudioContext || window.webkitAudioContext
  )();

  await audioContext.resume();

  scannerRunning = true;
  startButton.disabled = true;
  startButton.textContent = "Scanner Running";
  statusBox.textContent = "Starting camera…";

  try {
    const devices = await codeReader.listVideoInputDevices();

    if (!devices.length) {
      throw new Error("No camera was found.");
    }

    const rearCamera =
      devices.find((device) =>
        /back|rear|environment/i.test(device.label)
      ) || devices[devices.length - 1];

    statusBox.textContent =
      "Ready — point the camera at a barcode";

    codeReader.decodeFromVideoDevice(
      rearCamera.deviceId,
      video,
      (result, error) => {
        if (result) {
          handleScan(result.getText());
        }

        if (
          error &&
          !(error instanceof ZXing.NotFoundException)
        ) {
          console.error(error);
        }
      }
    );
  } catch (error) {
    console.error(error);

    scannerRunning = false;
    startButton.disabled = false;
    startButton.textContent = "Try Again";
    statusBox.textContent =
      error.message || "Unable to start the camera.";
  }
}

function handleScan(rawValue) {
  const barcode = rawValue.trim();
  const now = Date.now();

  // Stops one barcode from repeatedly registering
  // while it remains in front of the camera.
  if (barcode === lastCode && now - lastScanTime < 2000) {
    return;
  }

  lastCode = barcode;
  lastScanTime = now;
  scanCount += 1;

  resultBox.textContent = barcode;
  countBox.textContent = scanCount;
  statusBox.textContent = `Scanned: ${barcode}`;

  playBeep();

  // Works on supported devices. iPhone browsers may ignore it.
  if (navigator.vibrate) {
    navigator.vibrate(150);
  }

  document.body.classList.add("scan-success");

  setTimeout(() => {
    document.body.classList.remove("scan-success");
  }, 250);
}

function playBeep() {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = 1000;

  gain.gain.setValueAtTime(
    0.25,
    audioContext.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.12
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.12);
}

function exitScanner() {
  codeReader.reset();
  scannerRunning = false;

  if (audioContext) {
    audioContext.close();
  }

  if (window.history.length > 1) {
    window.history.back();
  } else {
    statusBox.textContent = "Scanner stopped.";
    startButton.disabled = false;
    startButton.textContent = "Start Scanner";
  }
}
