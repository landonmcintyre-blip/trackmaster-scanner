const routePage = document.getElementById("route-page");
const scannerPage = document.getElementById("scanner-page");
const routeNameBox = document.getElementById("route-name");
const routeMetaBox = document.getElementById("route-meta");
const routeProgressBox = document.getElementById("route-progress");
const routeSummaryLabel = document.getElementById(
  "route-summary-label"
);
const resumeScanningButton = document.getElementById(
  "resume-scanning-button"
);
const routeMessageBox = document.getElementById("route-message");
const dropListBox = document.getElementById("drop-list");
const networkStatusBox = document.getElementById("network-status");
const pendingSyncBox = document.getElementById("pending-sync");
const refreshRouteButton = document.getElementById("refresh-route-button");
const backToRouteButton = document.getElementById("back-to-route");
const video = document.getElementById("camera");
const statusBox = document.getElementById("status");
const resultBox = document.getElementById("scan-result");
const countBox = document.getElementById("scan-count");
const startButton = document.getElementById("start-button");
const flashlightButton = document.getElementById(
  "flashlight-button"
);
const resetButton = document.getElementById("test-reset-button");
const dropIdBox = document.getElementById("drop-id");
const remainingBox = document.getElementById("remaining-count");

const API_URL =
  "https://script.google.com/macros/s/AKfycby-XWD-6dWtzXHG1PtTy03Km326GsCmy3j4aKjJwa-0mRQI1w73iAsqc1ocr8XLeuEYog/exec";

const LAST_ROUTE_KEY = "trackmaster-last-route";
const SYNC_QUEUE_KEY = "trackmaster-sync-queue";

const urlParams = new URLSearchParams(window.location.search);
const requestedDropId = String(urlParams.get("dropId") || "").trim();
const requestedShippingEvent = String(
  urlParams.get("shippingEvent") || ""
).trim();
const rememberedShippingEvent = String(
  localStorage.getItem(LAST_ROUTE_KEY) || ""
).trim();

const shippingEvent =
  requestedShippingEvent ||
  requestedDropId.split("-")[0] ||
  rememberedShippingEvent;

const ROUTE_CACHE_KEY =
  `trackmaster-route-${shippingEvent || "missing"}`;
const ACCEPTED_KEY =
  `trackmaster-accepted-${shippingEvent || "missing"}`;

let activeDropId = requestedDropId;
let routeData = null;
let cartonLookup = new Map();
let cartonDataReady = false;
let activeDropTotal = 0;
let lastCode = "";
let lastScanTime = 0;
let scannerRunning = false;
let syncRunning = false;
let routeDataGeneration = 0;
let audioContext;
let cameraTrack = null;
let torchAvailable = false;
let torchOn = false;

const scannedCartons = new Set();

const hints = new Map();
hints.set(ZXing.DecodeHintType.TRY_HARDER, true);

const codeReader = new ZXing.BrowserMultiFormatReader(hints);
codeReader.timeBetweenDecodingAttempts = 80;

let rotateNextScanFrame = false;

codeReader.drawFrameOnCanvas = function (
  source,
  dimensions,
  suppliedContext
) {
  const context = suppliedContext || this.captureCanvasContext;
  const canvas = context.canvas;
  const sourceWidth = source.videoWidth;
  const sourceHeight = source.videoHeight;
  const rotateFrame = rotateNextScanFrame;

  rotateNextScanFrame = !rotateNextScanFrame;

  if (!sourceWidth || !sourceHeight) return;

  const targetWidth = rotateFrame ? sourceHeight : sourceWidth;
  const targetHeight = rotateFrame ? sourceWidth : sourceHeight;

  if (
    canvas.width !== targetWidth ||
    canvas.height !== targetHeight
  ) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (rotateFrame) {
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(Math.PI / 2);
    context.drawImage(
      source,
      -sourceWidth / 2,
      -sourceHeight / 2,
      sourceWidth,
      sourceHeight
    );
    context.setTransform(1, 0, 0, 1, 0, 0);
    return;
  }

  context.drawImage(
    source,
    0,
    0,
    sourceWidth,
    sourceHeight
  );
};

startButton.disabled = true;
refreshRouteButton.disabled = !navigator.onLine;
updateNetworkStatus();

startButton.addEventListener("click", startScanner);
flashlightButton.addEventListener("click", toggleFlashlight);
resumeScanningButton.addEventListener("click", resumeScanning);
backToRouteButton.addEventListener("click", showRoutePage);
refreshRouteButton.addEventListener("click", refreshRouteManually);
resetButton.addEventListener("click", resetCurrentDropForTesting);

window.addEventListener("online", handleConnectionChange);
window.addEventListener("offline", handleConnectionChange);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    updateNetworkStatus();
    syncPendingRecords();
  }
});

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

function updateNetworkStatus() {
  const online = navigator.onLine;

  networkStatusBox.textContent = online ? "ONLINE" : "OFFLINE";
  networkStatusBox.classList.toggle("online", online);
  networkStatusBox.classList.toggle("offline", !online);
  refreshRouteButton.disabled = !online;
  renderPendingSync();
}

function handleConnectionChange() {
  updateNetworkStatus();

  if (navigator.onLine) {
    syncPendingRecords();
    refreshCartonDataInBackground();
  }
}

function renderPendingSync() {
  const queue = readStoredJson(SYNC_QUEUE_KEY, []);
  const routeQueue = Array.isArray(queue)
    ? queue.filter(record =>
        String(record.shippingEvent) === shippingEvent
      )
    : [];

  pendingSyncBox.textContent = routeQueue.length
    ? `${routeQueue.length} waiting to sync`
    : "All scans synced";
}

function resetLocalDropIfRequested() {
  if (urlParams.get("resetScans") !== "1" || !activeDropId) {
    return;
  }

  routeDataGeneration++;
  clearLocalDropScanData();

  const cleanUrl = new URL(window.location.href);
  cleanUrl.searchParams.delete("resetScans");
  window.history.replaceState({}, "", cleanUrl.toString());
}

function getAcceptedCartons() {
  return new Set(
    readStoredJson(ACCEPTED_KEY, []).map(value =>
      String(value).trim().toUpperCase()
    )
  );
}

function getKnownAcceptedCartons() {
  return new Set([
    ...((routeData?.scannedCartons || []).map(value =>
      String(value).trim().toUpperCase()
    )),
    ...getAcceptedCartons()
  ]);
}

function rememberAcceptedCarton(cartonNumber) {
  const accepted = getAcceptedCartons();
  accepted.add(cartonNumber);
  writeStoredJson(ACCEPTED_KEY, [...accepted]);
}

function clearLocalDropScanData() {
  const cachedData = routeData || readStoredJson(ROUTE_CACHE_KEY, null);
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
    routeData = cachedData;
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

  renderPendingSync();
}

async function resetCurrentDropForTesting() {
  const confirmed = window.confirm(
    "TEST RESET\n\nDelete all recorded scans for this drop?"
  );

  if (!confirmed) return;

  if (!navigator.onLine) {
    statusBox.textContent = "RESET NEEDS SERVICE";
    resultBox.textContent =
      "Reconnect before resetting this test drop.";
    return;
  }

  stopScanner();
  resetButton.disabled = true;
  resetButton.textContent = "Resetting Drop...";
  startButton.disabled = true;
  statusBox.textContent = "Resetting drop scans...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "resetDropScans",
        shippingEvent,
        dropId: activeDropId
      })
    });

    if (!response.ok) {
      throw new Error("Could not reach the reset service.");
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "The reset was rejected.");
    }

    routeDataGeneration++;
    clearLocalDropScanData();
    applyRouteData(routeData);
    applyActiveDropData();

    cartonDataReady = true;
    startButton.disabled = false;
    startButton.textContent = "Start Scanner";
    document.body.classList.remove("scan-error");

    statusBox.textContent = "Drop reset";
    resultBox.textContent =
      `${data.deletedCount || 0} saved scans deleted.`;
  } catch (error) {
    console.error(error);
    startButton.disabled = false;
    statusBox.textContent = "RESET FAILED";
    resultBox.textContent = error.message;
  } finally {
    resetButton.disabled = false;
    resetButton.textContent = "TEST: Reset This Drop";
  }
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
  renderPendingSync();
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

  const submittedQueue = readStoredJson(SYNC_QUEUE_KEY, []);

  if (!Array.isArray(submittedQueue) || !submittedQueue.length) {
    renderPendingSync();
    return;
  }

  syncRunning = true;
  pendingSyncBox.textContent = `Syncing ${submittedQueue.length}…`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "syncBatch",
        records: submittedQueue
      }),
      keepalive: true
    });

    if (!response.ok) {
      throw new Error("Batch sync request failed.");
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Batch sync was rejected.");
    }

    const submittedIds = new Set(
      submittedQueue.map(record => record.id)
    );

    const latestQueue = readStoredJson(SYNC_QUEUE_KEY, []);
    const remainingQueue = latestQueue.filter(
      record => !submittedIds.has(record.id)
    );

    writeStoredJson(SYNC_QUEUE_KEY, remainingQueue);
  } catch (error) {
    console.error("TrackMaster batch sync paused:", error);
  } finally {
    syncRunning = false;
    renderPendingSync();
    renderRoutePage();

    if (
      navigator.onLine &&
      readStoredJson(SYNC_QUEUE_KEY, []).length
    ) {
      setTimeout(syncPendingRecords, 0);
    }
  }
}

async function loadCartonData() {
  try {
    if (!shippingEvent) {
      throw new Error(
        "No route is saved on this phone. Open TrackMaster from today’s route while online."
      );
    }

    localStorage.setItem(LAST_ROUTE_KEY, shippingEvent);
    const cachedData = readStoredJson(ROUTE_CACHE_KEY, null);

    if (cachedData?.cartons?.length) {
      applyRouteData(cachedData);
      showRequestedStartingScreen();

      routeMessageBox.textContent = navigator.onLine
        ? "Saved route ready — checking for updates…"
        : "Offline route ready — tap a drop to scan.";

      refreshCartonDataInBackground();
      syncPendingRecords();
      return;
    }

    const serverData = await fetchCartonDataFromServer();

    writeStoredJson(ROUTE_CACHE_KEY, serverData);
    applyRouteData(serverData);
    showRequestedStartingScreen();

    routeMessageBox.textContent =
      "Route downloaded to this phone — tap a drop to scan.";

    syncPendingRecords();
  } catch (error) {
    console.error(error);
    cartonDataReady = false;
    startButton.disabled = true;
    routeNameBox.textContent = "Route unavailable";
    routeMessageBox.textContent =
      error.message || "Unable to load carton data.";
    routeMessageBox.classList.add("error");
    showRoutePage();
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
  if (!navigator.onLine || !shippingEvent) return;

  const requestedGeneration = routeDataGeneration;

  try {
    const serverData = await fetchCartonDataFromServer();

    if (requestedGeneration !== routeDataGeneration) return;

    writeStoredJson(ROUTE_CACHE_KEY, serverData);
    applyRouteData(serverData);

    if (!scannerRunning && !scannerPage.hidden) {
      statusBox.textContent =
        `Ready — ${activeDropTotal} cartons for this drop`;
    }

    if (!routePage.hidden) {
      routeMessageBox.textContent =
        "Route is current and saved on this phone.";
    }
  } catch (error) {
    console.error("Route refresh paused:", error);
  }
}

async function refreshRouteManually() {
  refreshRouteButton.disabled = true;
  routeMessageBox.classList.remove("error");
  routeMessageBox.textContent = "Refreshing route data…";

  try {
    const serverData = await fetchCartonDataFromServer();
    writeStoredJson(ROUTE_CACHE_KEY, serverData);
    applyRouteData(serverData);
    routeMessageBox.textContent =
      "Route refreshed and saved on this phone.";
  } catch (error) {
    routeMessageBox.textContent = error.message;
    routeMessageBox.classList.add("error");
  } finally {
    refreshRouteButton.disabled = !navigator.onLine;
  }
}

function applyRouteData(data) {
  routeData = data;
  cartonLookup = new Map(
    data.cartons.map(carton => [
      String(carton.cartonNumber).trim().toUpperCase(),
      carton
    ])
  );

  cartonDataReady = true;
  routeMessageBox.classList.remove("error");
  renderRoutePage();

  if (!scannerPage.hidden && activeDropId) {
    applyActiveDropData();
  }
}

function showRequestedStartingScreen() {
  const requestedScreen = urlParams.get("screen");

  if (requestedScreen === "scan" && activeDropId) {
    openScannerForDrop(activeDropId);
    return;
  }

  showRoutePage();
}

function showRoutePage() {
  stopScanner();
  document.body.classList.remove("scan-success", "scan-error");
  scannerPage.hidden = true;
  routePage.hidden = false;
  renderRoutePage();

  const routeUrl = new URL(window.location.href);
  routeUrl.searchParams.set("shippingEvent", shippingEvent);
  routeUrl.searchParams.delete("screen");
  window.history.replaceState({}, "", routeUrl.toString());
}

function openScannerForDrop(dropId) {
  activeDropId = dropId;
  applyActiveDropData();

  routePage.hidden = true;
  scannerPage.hidden = false;
  document.body.classList.remove("scan-success", "scan-error");

  const scannerUrl = new URL(window.location.href);
  scannerUrl.searchParams.set("shippingEvent", shippingEvent);
  scannerUrl.searchParams.set("dropId", activeDropId);
  scannerUrl.searchParams.set("screen", "scan");
  window.history.replaceState({}, "", scannerUrl.toString());
  window.scrollTo(0, 0);
}

function resumeScanning() {
  if (!routeData?.cartons?.length) return;

  const knownAccepted = getKnownAcceptedCartons();
  const orderedCartons = [...routeData.cartons].sort(
    (a, b) => Number(a.dropNumber) - Number(b.dropNumber)
  );
  const cartonIsRemaining = carton =>
    !knownAccepted.has(
      String(carton.cartonNumber).trim().toUpperCase()
    );
  const activeDropHasRemaining = orderedCartons.some(carton =>
    carton.dropId === activeDropId && cartonIsRemaining(carton)
  );
  const nextCarton = activeDropHasRemaining
    ? orderedCartons.find(carton =>
        carton.dropId === activeDropId && cartonIsRemaining(carton)
      )
    : orderedCartons.find(cartonIsRemaining);

  if (nextCarton) {
    openScannerForDrop(nextCarton.dropId);
  }
}

function applyActiveDropData() {
  if (!routeData || !activeDropId) return;

  const activeDropCartons = routeData.cartons.filter(
    carton => carton.dropId === activeDropId
  );

  if (!activeDropCartons.length) {
    throw new Error("No cartons were found for this drop.");
  }

  const activeDropNumbers = new Set(
    activeDropCartons.map(carton =>
      String(carton.cartonNumber).trim().toUpperCase()
    )
  );

  scannedCartons.clear();
  const knownAccepted = getKnownAcceptedCartons();

  knownAccepted.forEach(cartonNumber => {
    if (activeDropNumbers.has(cartonNumber)) {
      scannedCartons.add(cartonNumber);
    }
  });

  activeDropTotal = activeDropCartons.length;
  updateProgress();

  const dropNumber = activeDropCartons[0].dropNumber;
  const customer = cleanCustomerName(
    activeDropCartons[0].customer
  );

  dropIdBox.textContent = `Drop ${dropNumber} · ${customer}`;
  resultBox.textContent = "None";
  statusBox.textContent = navigator.onLine
    ? `Ready — ${activeDropTotal} cartons for this drop`
    : `Ready from phone — ${activeDropTotal} cartons for this drop`;
  startButton.disabled = false;
  startButton.textContent = "Start Scanner";
}

function renderRoutePage() {
  if (!routeData?.cartons?.length) return;

  const routeName =
    String(routeData.routeName || "").trim() ||
    `Shipping Event ${shippingEvent}`;

  routeNameBox.textContent = routeName;
  routeMetaBox.textContent = routeData.routeDate
    ? `Shipping Event ${shippingEvent} · ${routeData.routeDate}`
    : `Shipping Event ${shippingEvent}`;

  const dropMap = new Map();

  routeData.cartons.forEach(carton => {
    const dropId = String(carton.dropId || "").trim();

    if (!dropMap.has(dropId)) {
      dropMap.set(dropId, {
        dropId,
        dropNumber: Number(carton.dropNumber),
        customers: [],
        cartons: []
      });
    }

    const drop = dropMap.get(dropId);
    const customer = cleanCustomerName(carton.customer);

    if (
      customer &&
      !drop.customers.some(existing =>
        existing.toLowerCase() === customer.toLowerCase()
      )
    ) {
      drop.customers.push(customer);
    }

    drop.cartons.push(carton);
  });

  const drops = [...dropMap.values()].sort(
    (a, b) => a.dropNumber - b.dropNumber
  );
  const knownAccepted = getKnownAcceptedCartons();
  const routeCartonNumbers = new Set(
    routeData.cartons.map(carton =>
      String(carton.cartonNumber).trim().toUpperCase()
    )
  );
  const routeScannedCount = [...knownAccepted].filter(
    cartonNumber => routeCartonNumbers.has(cartonNumber)
  ).length;

  routeProgressBox.textContent =
    `${routeScannedCount} of ${routeData.cartons.length} cartons scanned`;
  const routeComplete =
    routeScannedCount === routeData.cartons.length;

  resumeScanningButton.disabled = routeComplete;
  resumeScanningButton.classList.toggle("complete", routeComplete);
  routeSummaryLabel.textContent = routeComplete
    ? "Route complete"
    : "Route progress · Tap to resume";

  dropListBox.replaceChildren();

  drops.forEach(drop => {
    const scannedCount = drop.cartons.filter(carton =>
      knownAccepted.has(
        String(carton.cartonNumber).trim().toUpperCase()
      )
    ).length;
    const complete = scannedCount === drop.cartons.length;
    const card = document.createElement("button");
    const top = document.createElement("div");
    const number = document.createElement("span");
    const progress = document.createElement("span");
    const customer = document.createElement("div");
    const otherCustomers = document.createElement("div");
    const cartonTypes = document.createElement("div");

    card.type = "button";
    card.className = `drop-card${complete ? " complete" : ""}`;
    card.addEventListener("click", () =>
      openScannerForDrop(drop.dropId)
    );

    top.className = "drop-card-top";
    number.className = "drop-number";
    progress.className = "drop-progress";
    customer.className = "customer-name";
    otherCustomers.className = "other-customers";
    cartonTypes.className = "carton-types";

    number.textContent = `Drop ${drop.dropNumber}`;
    progress.textContent = complete
      ? "COMPLETE"
      : `${scannedCount}/${drop.cartons.length} scanned`;
    customer.textContent = drop.customers[0] || "Unknown customer";
    otherCustomers.textContent = drop.customers.length > 1
      ? `Also: ${drop.customers.slice(1).join(", ")}`
      : "";
    cartonTypes.textContent = formatCartonTypes(drop.cartons);

    top.append(number, progress);
    card.append(top, customer);

    if (otherCustomers.textContent) {
      card.append(otherCustomers);
    }

    card.append(cartonTypes);
    dropListBox.append(card);
  });

  renderPendingSync();
}

function cleanCustomerName(value) {
  return String(value || "Unknown customer")
    .replace(/^.*?\*\s*JOBSITE\s*\*\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function formatCartonTypes(cartons) {
  const typeCounts = new Map();

  cartons.forEach(carton => {
    const type = String(carton.cartonType || "Carton").trim();
    typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
  });

  return [...typeCounts.entries()]
    .map(([type, count]) =>
      `${count} ${count === 1 ? type : pluralizeType(type)}`
    )
    .join(" • ");
}

function pluralizeType(type) {
  const lowerType = type.toLowerCase();
  const specialPlurals = {
    box: "Boxes",
    bundle: "Bundles",
    stick: "Sticks",
    skid: "Skids",
    pallet: "Pallets",
    coil: "Coils",
    carton: "Cartons"
  };

  if (specialPlurals[lowerType]) {
    return specialPlurals[lowerType];
  }

  return /s$/i.test(type) ? type : `${type}s`;
}

async function startScanner() {
  document.body.classList.remove("scan-error");
  if (scannerRunning || !activeDropId) return;

  rotateNextScanFrame = false;

  audioContext = audioContext || new (
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

    const cameraConstraints = {
      video: {
        deviceId: { exact: rearCamera.deviceId },
        facingMode: { ideal: "environment" },
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        frameRate: { ideal: 30 }
      },
      audio: false
    };

    await codeReader.decodeFromConstraints(
      cameraConstraints,
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

    configureCameraControls();
    statusBox.textContent =
      "Ready — barcode can face any direction";
  } catch (error) {
    console.error(error);
    scannerRunning = false;
    startButton.disabled = false;
    startButton.textContent = "Try Again";
    statusBox.textContent =
      error.message || "Unable to start the camera.";
  }
}

function configureCameraControls() {
  const stream = video.srcObject;
  cameraTrack = stream?.getVideoTracks?.()[0] || null;

  let capabilities = {};

  try {
    capabilities = cameraTrack?.getCapabilities?.() || {};
  } catch (error) {
    console.warn("Camera capabilities unavailable:", error);
  }

  torchAvailable =
    capabilities.torch === true ||
    (
      Array.isArray(capabilities.torch) &&
      capabilities.torch.includes(true)
    );

  torchOn = false;
  flashlightButton.hidden = !torchAvailable;
  updateFlashlightButton();
}

async function toggleFlashlight() {
  if (!cameraTrack || !torchAvailable) return;

  const nextTorchState = !torchOn;

  try {
    await cameraTrack.applyConstraints({
      advanced: [{ torch: nextTorchState }]
    });

    torchOn = nextTorchState;
    updateFlashlightButton();
  } catch (error) {
    console.error("Flashlight control failed:", error);
    statusBox.textContent =
      "This phone would not allow flashlight control.";
  }
}

function updateFlashlightButton() {
  flashlightButton.classList.toggle("active", torchOn);
  flashlightButton.setAttribute("aria-pressed", String(torchOn));
  flashlightButton.setAttribute(
    "aria-label",
    torchOn ? "Turn flashlight off" : "Turn flashlight on"
  );
}

function resetCameraControls() {
  cameraTrack = null;
  torchAvailable = false;
  torchOn = false;
  flashlightButton.hidden = true;
  updateFlashlightButton();
}

function stopScanner() {
  if (scannerRunning) {
    codeReader.reset();
  }

  resetCameraControls();
  rotateNextScanFrame = false;
  scannerRunning = false;
  startButton.disabled = !cartonDataReady;
  startButton.textContent = "Start Scanner";
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
      `${barcode} belongs to Drop ${carton.dropNumber}\n${cleanCustomerName(carton.customer)}`
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
  renderRoutePage();
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
  stopScanner();
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
