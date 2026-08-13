const video = document.getElementById("camera");
const statusBox = document.getElementById("status");
const resultBox = document.getElementById("scan-result");
const countBox = document.getElementById("scan-count");
const startButton = document.getElementById("start-button");

const codeReader = new ZXing.BrowserMultiFormatReader();

let scanCount = 0;
let lastCode = "";
let lastScanTime = 0;
let scannerRunning = false;

startButton.addEventListener("click", startScanner);

async function startScanner() {
  if (scannerRunning) return;

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

    statusBox.textContent = "Ready — point the camera at a barcode";

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

  // Prevent one barcode held in view from firing repeatedly.
  if (barcode === lastCode && now - lastScanTime < 2000) {
    return;
  }

  lastCode = barcode;
  lastScanTime = now;
  scanCount += 1;

  resultBox.textContent = barcode;
  countBox.textContent = scanCount;
  statusBox.textContent = `Scanned: ${barcode}`;

  if (navigator.vibrate) {
    navigator.vibrate(100);
  }

  // The camera remains running and immediately looks for the next barcode.
}
