const video = document.getElementById("camera");
const statusBox = document.getElementById("status");
const resultBox = document.getElementById("scan-result");
const countBox = document.getElementById("scan-count");
const startButton = document.getElementById("start-button");
const dropIdBox = document.getElementById("drop-id");
const remainingBox = document.getElementById("remaining-count");

const urlParams = new URLSearchParams(window.location.search);
const activeDropId = urlParams.get("dropId");
const shippingEvent = activeDropId?.split("-")[0] || "";

const API_URL =
  "https://script.google.com/macros/s/AKfycby-XWD-6dWtzXHG1PtTy03Km326GsCmy3j4aKjJwa-0mRQI1w73iAsqc1ocr8XLeuEYog/exec";

const ROUTE_CACHE_KEY = `trackmaster-route-${shippingEvent}`;
const ACCEPTED_KEY = `trackmaster-accepted-${shippingEvent}`;
const SYNC_QUEUE_KEY = "trackmaster-sync-queue";

let cartonLookup = new Map();
let cartonDataReady = false;
let activeDropTotal = 0;
let lastCode = "";
let lastScanTime = 0;
let scannerRunning = false;
let syncRunning = false;
let audioContext;

const scannedCartons = new Set();

dropIdBox.textContent = activeDropId || "Not provided";
startButton.disabled = true;
statusBox.textContent = "Loading carton data...";

const hints = new Map();
hints.set(ZXing.DecodeHintType.TRY_HARDER, true);

const codeReader = new ZXing.BrowserMultiFormatReader(hints);

startButton.addEventListener("click", startScanner);
window.addEventListener("online", syncPendingRecords);

resetLocalDropIfRequested();
loadCartonData();
setInterval(syncPendingRecords, 15000);

function readStoredJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error(`Could not read ${key}:`, error);
    return fallback;
  }
}

function writeStoredJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function resetLocalDropIfRequested() {
  if (urlParams.get("resetScans") !== "1") return;

  const cachedData = readStoredJson(ROUTE_CACHE_KEY, null);
  const dropCartonNumbers = new Set(
    (cachedData?.cartons || [])
      .filter(carton => carton.dropId === activeDropId)
      .map(carton =>
        String(carton.cartonNumber).trim().toUpperCase()
      )
  );

  if (dropCartonNumbers.size) {
    const accepted = readStoredJson(ACCEPTED_KEY, [])
      .map(value => String(value).trim().toUpperCase())
      .filter(cartonNumber =>
        !dropCartonNumbers.has(cartonNumber)
      );

    writeStoredJson(ACCEPTED_KEY, accepted);

    cachedData.scannedCartons =
      (cachedData.scannedCartons || [])
        .map(value => String(value).trim().toUpperCase())
        .filter(cartonNumber =>
          !dropCartonNumbers.has(cartonNumber)
        );

    writeStoredJson(ROUTE_CACHE_KEY, cachedData);
  } else {
    localStorage.removeItem(ACCEPTED_KEY);
  }

  const queue = readStoredJson(SYNC_QUEUE_KEY, []);

  if (Array.isArray(queue)) {
    const retainedQueue = queue.filter(record =>
      !(
        String(record.shippingEvent) === shippingEvent &&
        String(record.dropId) === activeDropId
      )
    );

    writeStoredJson(SYNC_QUEUE_KEY, retainedQueue);
  }

  const cleanUrl = new URL(window.location.href);
  cleanUrl.searchParams.delete("resetScans");
  window.history.replaceState({}, "", cleanUrl.toString());

  resultBox.textContent =
    "Local test scans reset for this drop.";
}

function getAcceptedCartons() {
  return new Set(
    readStoredJson(ACCEPTED_KEY, []).map(value =>
      String(value).toUpperCase()
    )
  );
}

function rememberAcceptedCarton(cartonNumber) {
  const accepted = getAcceptedCartons();
  accepted.add(cartonNumber);
  writeStoredJson(ACCEPTED_KEY, [...accepted]);
}

function createRecordId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function queueRecord(record) {
  const queue = readStoredJson(SYNC_QUEUE_KEY, []);

  if (record.action === "successfulScan") {
    const alreadyQueued = queue.some(item =>
      item.action === "successfulScan" &&
      item.shippingEvent === record.shippingEvent &&
      item.cartonNumber === record.cartonNumber
    );

    if (alreadyQueued) return;
  }

  queue.push({
    id: createRecordId(),
    queuedAt: new Date().toISOString(),
    ...record
  });

  writeStoredJson(SYNC_QUEUE_KEY, queue);
}

function queueSuccessfulScan(cartonNumber) {
  rememberAcceptedCarton(cartonNumber);

  queueRecord({
    action: "successfulScan",
    shippingEvent,
    dropId: activeDropId,
    cartonNumber
  });

  syncPendingRecords();
}

function queueScanException(cartonNumber, exceptionType, notes) {
  queueRecord({
    action: "exception",
    shippingEvent,
    dropId: activeDropId,
    cartonNumber,
    exceptionType,
    notes
  });

  syncPendingRecords();
}

async function syncPendingRecords() {
  if (syncRunning || !navigator.onLine) return;

  syncRunning = true;

  try {
    let queue = readStoredJson(SYNC_QUEUE_KEY, []);

    while (queue.length) {
      const record = queue[0];

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(record),
          keepalive: true
        });

        if (!response.ok) {
          throw new Error("Sync request failed.");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Sync was rejected.");
        }

        queue.shift();
        writeStoredJson(SYNC_QUEUE_KEY, queue);
      } catch (error) {
        console.error("TrackMaster sync paused:", error);
        break;
      }
    }
  } finally {
    syncRunning = false;
  }
}

async function loadCartonData() {
  try {
    if (!activeDropId || !shippingEvent) {
      throw new Error("No active drop was provided.");
    }

    const cachedData = readStoredJson(ROUTE_CACHE_KEY, null);

    if (cachedData?.cartons?.length) {
      applyCartonData(cachedData);

      cartonDataReady = true;
      startButton.disabled = false;
      startButton.textContent = "Start Scanner";
      statusBox.textContent =
        `Ready from phone — ${activeDropTotal} cartons for this drop`;

      refreshCartonDataInBackground();
      syncPendingRecords();
      return;
    }

    const serverData = await fetchCartonDataFromServer();

    writeStoredJson(ROUTE_CACHE_KEY, serverData);
    applyCartonData(serverData);

    cartonDataReady = true;
    startButton.disabled = false;
    startButton.textContent = "Start Scanner";
    statusBox.textContent =
      `Ready — ${activeDropTotal} cartons for this drop`;

    syncPendingRecords();
  } catch (error) {
    console.error(error);
    cartonDataReady = false;
    startButton.disabled = true;
    statusBox.textContent =
      error.message || "Unable to load carton data.";
  }
}

async function fetchCartonDataFromServer() {
  const response = await fetch(
    `${API_URL}?shippingEvent=${encodeURIComponent(shippingEvent)}`
  );

  if (!response.ok) {
    throw new Error("Could not reach carton data.");
  }

  const serverData = await response.json();

  if (!serverData.success) {
    throw new Error(serverData.error || "Carton data failed to load.");
  }

  if (!Array.isArray(serverData.cartons) || !serverData.cartons.length) {
    throw new Error("The server returned an empty route.");
  }

  return serverData;
}

async function refreshCartonDataInBackground() {
  try {
    const serverData = await fetchCartonDataFromServer();

    writeStoredJson(ROUTE_CACHE_KEY, serverData);
    applyCartonData(serverData);

    if (
      !scannerRunning &&
      !document.body.classList.contains("scan-error")
    ) {
      statusBox.textContent =
        `Ready — ${activeDropTotal} cartons for this drop`;
    }
  } catch (error) {
    console.error("Route refresh paused:", error);
  }
}

function applyCartonData(data) {
  cartonLookup = new Map(
    data.cartons.map(carton => [
      carton.cartonNumber.toUpperCase(),
      carton
    ])
  );

  const activeDropCartons = data.cartons.filter(
    carton => carton.dropId === activeDropId
  );

  if (!activeDropCartons.length) {
    throw new Error("No cartons were found for this drop.");
  }

  const activeDropNumbers = new Set(
    activeDropCartons.map(carton =>
      carton.cartonNumber.toUpperCase()
    )
  );

  scannedCartons.clear();

  const knownAccepted = new Set([
    ...(data.scannedCartons || []).map(value =>
      String(value).toUpperCase()
    ),
    ...getAcceptedCartons()
  ]);

  knownAccepted.forEach(cartonNumber => {
    if (activeDropNumbers.has(cartonNumber)) {
      scannedCartons.add(cartonNumber);
    }
  });

  activeDropTotal = activeDropCartons.length;
  updateProgress();

  const rawDropName =
    activeDropCartons[0]?.customer || "Unknown stop";

  const activeDropName = rawDropName
    .replace(/^.*?\*\s*JOBSITE\s*\*\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();

  dropIdBox.textContent = activeDropName;
}

async function startScanner() {
  document.body.classList.remove("scan-error");
  if (scannerRunning) return;

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
      devices.find(device =>
        /back|rear|environment/i.test(device.label)
      ) || devices[devices.length - 1];

    statusBox.textContent =
      "Ready — point the camera at a carton tag";

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

function updateProgress() {
  const scanned = scannedCartons.size;
  const remaining = Math.max(activeDropTotal - scanned, 0);

  countBox.textContent =
    `${scanned} of ${activeDropTotal} cartons scanned`;

  remainingBox.textContent = remaining === 0
    ? "0 cartons remaining — DROP COMPLETE"
    : `${remaining} cartons remaining`;
}

function handleScan(rawValue) {
  if (!cartonDataReady || !scannerRunning) return;

  const barcode = String(rawValue).trim().toUpperCase();
  const now = Date.now();

  if (barcode === lastCode && now - lastScanTime < 2000) {
    return;
  }

  lastCode = barcode;
  lastScanTime = now;

  if (!/^C\d+$/.test(barcode)) {
    hardStop(
      "UNKNOWN BARCODE",
      `${barcode}\n\nThis is not a TrackMaster carton number.`
    );
    return;
  }

  const carton = cartonLookup.get(barcode);

  if (!carton) {
    queueScanException(
      barcode,
      "Wrong Route",
      `Carton scanned at ${activeDropId}, but it is not assigned to Shipping Event ${shippingEvent}.`
    );

    hardStop(
      "WRONG ROUTE",
      `${barcode}\n\nThis carton is not assigned to this route.`
    );
    return;
  }

  if (carton.dropId !== activeDropId) {
    queueScanException(
      barcode,
      "Wrong Drop",
      `Scanned at ${activeDropId}; assigned to ${carton.dropId}, Drop ${carton.dropNumber}, ${carton.customer}.`
    );

    hardStop(
      "WRONG DROP",
      `${barcode} belongs to Drop ${carton.dropNumber}\n${carton.customer}`
    );
    return;
  }

  if (scannedCartons.has(barcode)) {
    statusBox.textContent = `Already scanned: ${barcode}`;
    resultBox.textContent = barcode;
    playDuplicateBeep();
    return;
  }

  try {
    queueSuccessfulScan(barcode);
  } catch (error) {
    hardStop(
      "SCAN NOT SAVED",
      `${barcode}\n\nThe phone could not store this scan.`
    );
    return;
  }

  scannedCartons.add(barcode);
  resultBox.textContent = barcode;
  statusBox.textContent = `Correct: ${barcode}`;
  updateProgress();
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
  startButton.disabled = false;
  startButton.textContent = "Resume Scanning";

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

function playBeep() {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = 1000;

  gain.gain.setValueAtTime(0.25, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.12
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.12);
}
