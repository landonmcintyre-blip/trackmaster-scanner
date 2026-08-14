const video = document.getElementById("camera");
const statusBox = document.getElementById("status");
const resultBox = document.getElementById("scan-result");
const countBox = document.getElementById("scan-count");
const startButton = document.getElementById("start-button");
const dropIdBox = document.getElementById("drop-id");
const remainingBox =
  document.getElementById("remaining-count");

const urlParams = new URLSearchParams(window.location.search);
const activeDropId = urlParams.get("drop");

dropIdBox.textContent = activeDropId || "Not provided";
const API_URL =
  "https://script.google.com/macros/s/AKfycbwVuvB6tfS4qUUarTiCr1EFaeAINjyWcw0IBfc8nUDrfgDKNy1tZ7BkJzUokC8ShKJiAw/exec";

const shippingEvent =
  activeDropId?.split("-")[0] || "";

let cartonLookup = new Map();
let cartonDataReady = false;

startButton.disabled = true;
statusBox.textContent = "Loading carton data...";

loadCartonData();


async function loadCartonData() {
  try {
    if (!activeDropId || !shippingEvent) {
      throw new Error("No active drop was provided.");
    }

    const response = await fetch(
      `${API_URL}?shippingEvent=${encodeURIComponent(shippingEvent)}`
    );

    if (!response.ok) {
      throw new Error("Could not reach carton data.");
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Carton data failed to load.");
    }

    cartonLookup = new Map(
      data.cartons.map(carton => [
        carton.cartonNumber.toUpperCase(),
        carton
      ])
    );

    cartonDataReady = true;
    startButton.disabled = false;
    startButton.textContent = "Resume Scanning";
    const activeDropCartons = data.cartons.filter(
  carton => carton.dropId === activeDropId
);
    const activeDropNumbers = new Set(
  activeDropCartons.map(carton =>
    carton.cartonNumber.toUpperCase()
  )
);

scannedCartons.clear();

(data.scannedCartons || []).forEach(cartonNumber => {
  const normalized = cartonNumber.toUpperCase();

  if (activeDropNumbers.has(normalized)) {
    scannedCartons.add(normalized);
  }
});

scanCount = scannedCartons.size;
updateProgress(activeDropCartons.length);

    const rawDropName =
  activeDropCartons[0]?.customer || "Unknown stop";

const activeDropName = rawDropName
  .replace(/^.*?\*\s*JOBSITE\s*\*\s*/i, "")
  .replace(/\s+/g, " ")
  .trim();

dropIdBox.textContent = activeDropName;
statusBox.textContent =
  `Ready — ${activeDropCartons.length} cartons for this drop`;

  } 
  
  catch (error) {
    console.error(error);

    cartonDataReady = false;
    startButton.disabled = true;
    statusBox.textContent =
      error.message || "Unable to load carton data.";
  }
}

const hints = new Map();
hints.set(ZXing.DecodeHintType.TRY_HARDER, true);

const codeReader =
  new ZXing.BrowserMultiFormatReader(hints);
let scanCount = 0;
let lastCode = "";
let lastScanTime = 0;
let scannerRunning = false;
let audioContext;
const scannedCartons = new Set();

startButton.addEventListener("click", startScanner);

async function startScanner() {
  document.body.classList.remove("scan-error");
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
function updateProgress(totalCartons) {
  const scanned = scannedCartons.size;
  const remaining = Math.max(totalCartons - scanned, 0);

  countBox.textContent =
    `${scanned} of ${totalCartons} cartons scanned`;

  remainingBox.textContent =
    remaining === 0
      ? "0 cartons remaining — DROP COMPLETE"
      : `${remaining} cartons remaining`;
}

async function saveSuccessfulScan(cartonNumber) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({
      action: "successfulScan",
      shippingEvent: shippingEvent,
      dropId: activeDropId,
      cartonNumber: cartonNumber
    })
  });

  if (!response.ok) {
    throw new Error("Could not save the scan.");
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Could not save the scan.");
  }

  return data;
}

function handleScan(rawValue) {
  if (!cartonDataReady || !scannerRunning) {
    return;
  }

  const barcode = String(rawValue)
    .trim()
    .toUpperCase();

  const now = Date.now();

  if (barcode === lastCode && now - lastScanTime < 2000) {
    return;
  }

  lastCode = barcode;
  lastScanTime = now;

  // Anything that is not C followed by numbers is unknown.
  if (!/^C\d+$/.test(barcode)) {
    hardStop(
      "UNKNOWN BARCODE",
      `${barcode}\n\nThis is not a TrackMaster carton number.`
    );
    return;
  }

  const carton = cartonLookup.get(barcode);

  // Correct format, but not present anywhere on this truck.
  if (!carton) {
    hardStop(
      "UNKNOWN CARTON",
      `${barcode}\n\nThis carton is not assigned to this shipping event.`
    );
    return;
  }

  // It exists on the truck, but belongs at another stop.
  if (carton.dropId !== activeDropId) {
    hardStop(
      "WRONG DROP",
      `${barcode} belongs to Drop ${carton.dropNumber}\n${carton.customer}`
    );
    return;
  }
if (scannedCartons.has(barcode)) {
  statusBox.textContent =
    `Already scanned: ${barcode}`;

  resultBox.textContent = barcode;
  playDuplicateBeep();
  return;
}
  // Already accepted during this scanner session.
  if (scannedCartons.has(barcode)) {
    statusBox.textContent =
      `Already scanned: ${barcode}`;

    resultBox.textContent = barcode;
    return;
  }

  scannedCartons.add(barcode);
  scanCount += 1;

  resultBox.textContent = barcode;
  countBox.textContent = scanCount;
  statusBox.textContent = `Correct: ${barcode}`;
function playDuplicateBeep() {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.frequency.value = 350;
  oscillator.type = "square";

  gain.gain.setValueAtTime(0.15, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.25
  );

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.25);
}
  playBeep();

  if (navigator.vibrate) {
    navigator.vibrate(150);
  }

  document.body.classList.add("scan-success");

  setTimeout(() => {
    document.body.classList.remove("scan-success");
  }, 250);
}


function hardStop(title, message) {
  codeReader.reset();
  scannerRunning = false;

  // Allow the driver to restart after acknowledging the warning.
  startButton.disabled = false;

  document.body.classList.remove("scan-success");
  document.body.classList.add("scan-error");

  statusBox.textContent = title;
  resultBox.textContent = message;

  if (navigator.vibrate) {
    navigator.vibrate([300, 150, 300]);
  }

  setTimeout(() => {
    alert(
      `${title}\n\n${message}\n\nVerify the carton before continuing.`
    );
  }, 100);
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
