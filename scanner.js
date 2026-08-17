const loginPage = document.getElementById("login-page");
const loginForm = document.getElementById("login-form");
const loginPhone = document.getElementById("login-phone");
const loginPin = document.getElementById("login-pin");
const loginButton = document.getElementById("login-button");
const loginMessage = document.getElementById("login-message");
const routePickerPage = document.getElementById("route-picker-page");
const driverWelcome = document.getElementById("driver-welcome");
const routePickerMessage = document.getElementById(
  "route-picker-message"
);
const assignedRouteList = document.getElementById(
  "assigned-route-list"
);
const refreshAssignedRoutesButton = document.getElementById(
  "refresh-assigned-routes"
);
const myRoutesButton = document.getElementById("my-routes-button");
const signOutButtons = document.querySelectorAll(".sign-out-button");
const routePage = document.getElementById("route-page");
const dropOverviewPage = document.getElementById("drop-overview-page");
const overviewBackToRouteButton = document.getElementById(
  "overview-back-to-route"
);
const overviewDropName = document.getElementById("overview-drop-name");
const overviewScanButton = document.getElementById(
  "overview-scan-button"
);
const overviewProgress = document.getElementById("overview-progress");
const overviewCartonList = document.getElementById(
  "overview-carton-list"
);
const scannerPage = document.getElementById("scanner-page");
const manualEntryPage = document.getElementById("manual-entry-page");
const manualEntryButton = document.getElementById("manual-entry-button");
const manualEntryCancelButton = document.getElementById("manual-entry-cancel");
const manualEntryForm = document.getElementById("manual-entry-form");
const manualCartonNumber = document.getElementById("manual-carton-number");
const manualExplanation = document.getElementById("manual-explanation");
const manualExplanationSection = document.getElementById(
  "manual-explanation-section"
);
const manualExplanationCount = document.getElementById("manual-explanation-count");
const manualPhotoCamera = document.getElementById("manual-photo-camera");
const manualPhotoPreview = document.getElementById("manual-photo-preview");
const manualPhotoCanvas = document.getElementById("manual-photo-canvas");
const captureManualPhotoButton = document.getElementById("capture-manual-photo");
const manualPhotoHelp = document.getElementById("manual-photo-help");
const manualPhotoSection = document.getElementById("manual-photo-section");
const manualPhotoProgress = document.getElementById("manual-photo-progress");
const manualEntryMessage = document.getElementById("manual-entry-message");
const submitManualEntryButton = document.getElementById("submit-manual-entry");
const routeNameBox = document.getElementById("route-name");
const routeMetaBox = document.getElementById("route-meta");
const routeMessageBox = document.getElementById("route-message");
const dropListBox = document.getElementById("drop-list");
const networkStatusBox = document.getElementById("network-status");
const pendingSyncBox = document.getElementById("pending-sync");
const refreshRouteButton = document.getElementById("refresh-route-button");
const backToRouteButton = document.getElementById("back-to-route");
const scannerOverviewButton = document.getElementById(
  "scanner-overview-button"
);
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
const openDamageScannerButton = document.getElementById("open-damage-scanner");
const damageFormPage = document.getElementById("damage-form-page");
const damageCompletePage = document.getElementById("damage-complete-page");
const damageForm = document.getElementById("damage-form");
const damageFormCancel = document.getElementById("damage-form-cancel");
const damageCartonNumber = document.getElementById("damage-carton-number");
const damageCartonDetails = document.getElementById("damage-carton-details");
const damageDescription = document.getElementById("damage-description");
const damageDescriptionCount = document.getElementById("damage-description-count");
const productPhotoFields = document.getElementById("product-photo-fields");
const damagePhotoInput = document.getElementById("damage-photo-input");
const damageCameraInput = document.getElementById("damage-camera-input");
const takeDamagePhotoButton = document.getElementById("take-damage-photo");
const addDamagePhotosButton = document.getElementById("add-damage-photos");
const damagePhotoCount = document.getElementById("damage-photo-count");
const damagePhotoPreviews = document.getElementById("damage-photo-previews");
const damageFormMessage = document.getElementById("damage-form-message");
const damageCompleteSummary = document.getElementById("damage-complete-summary");
const reportMoreDamageButton = document.getElementById("report-more-damage");
const returnToDropButton = document.getElementById("return-to-drop");

const API_URL =
  "https://script.google.com/macros/s/AKfycby-XWD-6dWtzXHG1PtTy03Km326GsCmy3j4aKjJwa-0mRQI1w73iAsqc1ocr8XLeuEYog/exec";

const LAST_ROUTE_KEY = "trackmaster-last-route";
const SYNC_QUEUE_KEY = "trackmaster-sync-queue";
const DRIVER_SESSION_KEY = "trackmaster-driver-session";
const SAVED_PHONE_KEY = "trackmaster-saved-phone";

const urlParams = new URLSearchParams(window.location.search);
const forceRoutePicker = urlParams.get("chooseRoute") === "1";
const requestedDropId = String(urlParams.get("dropId") || "").trim();
const requestedShippingEvent = String(
  urlParams.get("shippingEvent") || ""
).trim();
const rememberedShippingEvent = String(
  localStorage.getItem(LAST_ROUTE_KEY) || ""
).trim();

const linkedShippingEvent =
  requestedShippingEvent ||
  requestedDropId.split("-")[0];

const shippingEvent =
  linkedShippingEvent ||
  (!navigator.onLine && !forceRoutePicker
    ? rememberedShippingEvent
    : "");

const ROUTE_CACHE_KEY =
  `trackmaster-route-${shippingEvent || "missing"}`;
const ACCEPTED_KEY =
  `trackmaster-accepted-${shippingEvent || "missing"}`;
const MISSING_KEY =
  `trackmaster-missing-${shippingEvent || "missing"}`;
const DAMAGED_KEY =
  `trackmaster-damaged-${shippingEvent || "missing"}`;

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
let appStarted = false;
let latestLocation = null;
let locationWatchId = null;
let locationPermissionDenied = false;
let manualPhotoStream = null;
let manualPhotos = [];
let damageMode = false;
let selectedDamageCarton = null;
let productPhotos = new Map();
let damagePhotos = [];
let damageReturnScreen = "overview";

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

loginForm.addEventListener("submit", handleLogin);
loginPhone.addEventListener("input", formatLoginPhone);
loginPin.addEventListener("input", () => {
  loginPin.value = loginPin.value.replace(/\D/g, "").slice(0, 4);
});
refreshAssignedRoutesButton.addEventListener(
  "click",
  () => loadAssignedRoutes(true)
);
myRoutesButton.addEventListener("click", showMyRoutes);
signOutButtons.forEach(button => {
  button.addEventListener("click", signOutDriver);
});
startButton.addEventListener("click", startScanner);
flashlightButton.addEventListener("click", toggleFlashlight);
backToRouteButton.addEventListener("click", showRoutePage);
overviewBackToRouteButton.addEventListener("click", showRoutePage);
overviewScanButton.addEventListener("click", () => {
  if (activeDropId) openScannerForDrop(activeDropId, true);
});
scannerOverviewButton.addEventListener("click", () => {
  if (activeDropId) openDropOverview(activeDropId);
});
refreshRouteButton.addEventListener("click", refreshRouteManually);
resetButton.addEventListener("click", resetCurrentDropForTesting);
manualEntryButton.addEventListener("click", () => {
  if (!damageMode) {
    openManualEntry();
    return;
  }

  const entered = window.prompt("Enter the damaged carton number:", "C");
  if (entered === null) return;
  const cartonNumber = String(entered).trim().toUpperCase().replace(/^C?/, "C");
  identifyDamageCarton(cartonNumber, "scanner");
});
openDamageScannerButton.addEventListener("click", openDamageScanner);
damageFormCancel.addEventListener("click", cancelDamageForm);
damageForm.addEventListener("submit", submitDamageReport);
damageDescription.addEventListener("input", updateDamageDescriptionCount);
addDamagePhotosButton.addEventListener("click", () => damagePhotoInput.click());
damagePhotoInput.addEventListener("change", addSelectedDamagePhotos);
takeDamagePhotoButton.addEventListener("click", () => damageCameraInput.click());
damageCameraInput.addEventListener("change", addSelectedDamagePhotos);
reportMoreDamageButton.addEventListener("click", openDamageScanner);
returnToDropButton.addEventListener("click", () => openDropOverview(activeDropId));
manualEntryCancelButton.addEventListener("click", closeManualEntry);
manualEntryForm.addEventListener("submit", submitManualEntry);
captureManualPhotoButton.addEventListener("click", captureManualPhoto);
manualCartonNumber.addEventListener("input", () => {
  manualCartonNumber.value = manualCartonNumber.value
    .replace(/\D/g, "")
    .slice(0, 12);
});
manualExplanation.addEventListener("input", updateManualExplanationCount);
document.querySelectorAll('input[name="tag-status"]').forEach(input => {
  input.addEventListener("change", resetManualPhotos);
});

window.addEventListener("online", handleConnectionChange);
window.addEventListener("offline", handleConnectionChange);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    updateNetworkStatus();
    syncPendingRecords();
  }
});

resetLocalDropIfRequested();
initializeAuthentication();
setInterval(syncPendingRecords, 15000);

function initializeAuthentication() {
  const savedDriver = readStoredJson(DRIVER_SESSION_KEY, null);

  loginPhone.value = localStorage.getItem(SAVED_PHONE_KEY) || "";

  if (savedDriver?.driverId && savedDriver?.phone) {
    openTrackMaster();
    return;
  }

  loginPage.hidden = false;
  routePickerPage.hidden = true;
  routePage.hidden = true;
  dropOverviewPage.hidden = true;
  scannerPage.hidden = true;
  manualEntryPage.hidden = true;
  damageFormPage.hidden = true;
  damageCompletePage.hidden = true;
  loginPhone.focus();
}

async function handleLogin(event) {
  event.preventDefault();

  const phone = loginPhone.value.replace(/\D/g, "");
  const pin = loginPin.value.replace(/\D/g, "");

  loginMessage.textContent = "";

  if (phone.length !== 10 || pin.length !== 4) {
    loginMessage.textContent =
      "Enter a 10-digit phone number and 4-digit PIN.";
    return;
  }

  if (!navigator.onLine) {
    loginMessage.textContent =
      "The first sign-in on this phone requires service.";
    return;
  }

  loginButton.disabled = true;
  loginButton.textContent = "Signing In…";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "login",
        phone,
        pin
      })
    });

    if (!response.ok) {
      throw new Error("Could not reach TrackMaster.");
    }

    const data = await response.json();

    if (!data.success || !data.driver?.driverId) {
      throw new Error(
        data.error || "Incorrect phone number or PIN."
      );
    }

    writeStoredJson(DRIVER_SESSION_KEY, {
      driverId: String(data.driver.driverId),
      driverName: String(data.driver.driverName || ""),
      phone: String(data.driver.phone),
      signedInAt: new Date().toISOString()
    });
    localStorage.setItem(SAVED_PHONE_KEY, loginPhone.value);

    loginPin.value = "";
    openTrackMaster();
  } catch (error) {
    loginMessage.textContent =
      error.message || "Sign-in failed. Please try again.";
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = "Sign In";
  }
}

function formatLoginPhone() {
  const digits = loginPhone.value.replace(/\D/g, "").slice(0, 10);

  if (digits.length < 4) {
    loginPhone.value = digits;
  } else if (digits.length < 7) {
    loginPhone.value = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else {
    loginPhone.value =
      `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
}

function openTrackMaster() {
  loginPage.hidden = true;

  if (appStarted) return;

  appStarted = true;

  if (shippingEvent && !forceRoutePicker) {
    routePage.hidden = false;
    loadCartonData();
    return;
  }

  loadAssignedRoutes();
}

async function loadAssignedRoutes(forceRefresh = false) {
  const driver = readStoredJson(DRIVER_SESSION_KEY, null);

  if (!driver?.driverId) {
    signOutDriver();
    return;
  }

  const cacheKey = `trackmaster-assigned-routes-${driver.driverId}`;
  const cached = readStoredJson(cacheKey, null);

  loginPage.hidden = true;
  routePage.hidden = true;
  dropOverviewPage.hidden = true;
  scannerPage.hidden = true;
  manualEntryPage.hidden = true;
  routePickerPage.hidden = false;
  driverWelcome.textContent = driver.driverName
    ? `Signed in as ${driver.driverName}`
    : `Driver ${driver.driverId}`;
  assignedRouteList.innerHTML = "";

  if (!navigator.onLine && cached?.routes) {
    displayAssignedRoutes(cached.routes, true);
    return;
  }

  if (!navigator.onLine) {
    routePickerMessage.textContent =
      "No assigned routes are saved on this phone. Connect to service and try again.";
    routePickerMessage.classList.add("error");
    return;
  }

  if (!forceRefresh && cached?.routes?.length) {
    routePickerMessage.textContent =
      "Saved assignments ready — checking for updates…";
  } else {
    routePickerMessage.textContent = "Finding today’s assigned routes…";
  }

  refreshAssignedRoutesButton.disabled = true;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "driverRoutes",
        driverId: driver.driverId
      })
    });

    if (!response.ok) {
      throw new Error("Could not reach assigned routes.");
    }

    const data = await response.json();

    if (!data.success || !Array.isArray(data.routes)) {
      throw new Error(
        data.error || "Assigned routes could not be loaded."
      );
    }

    writeStoredJson(cacheKey, {
      routes: data.routes,
      savedAt: new Date().toISOString()
    });
    displayAssignedRoutes(data.routes, false);
  } catch (error) {
    if (cached?.routes?.length) {
      displayAssignedRoutes(cached.routes, true);
      return;
    }

    routePickerMessage.textContent =
      error.message || "Assigned routes could not be loaded.";
    routePickerMessage.classList.add("error");
  } finally {
    refreshAssignedRoutesButton.disabled = !navigator.onLine;
  }
}

function displayAssignedRoutes(routes, fromCache) {
  routePickerMessage.classList.remove("error");

  if (!routes.length) {
    routePickerMessage.textContent =
      "No routes are assigned to you for today.";
    assignedRouteList.innerHTML = "";
    return;
  }

  if (routes.length === 1 && !forceRoutePicker) {
    openAssignedRoute(routes[0].shippingEvent);
    return;
  }

  routePickerMessage.textContent = fromCache
    ? "Offline assignments ready — choose a route."
    : "Choose a route to begin.";
  assignedRouteList.innerHTML = "";

  routes.forEach(route => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "assigned-route-card";
    button.innerHTML = `
      <span class="assigned-route-name"></span>
      <span class="assigned-route-meta"></span>
    `;
    button.querySelector(".assigned-route-name").textContent =
      formatRouteDisplayName(route.routeName) ||
      `Shipping Event ${route.shippingEvent}`;
    button.querySelector(".assigned-route-meta").textContent =
      `${route.routeDate || "Today"} · SE ${route.shippingEvent}`;
    button.addEventListener("click", () =>
      openAssignedRoute(route.shippingEvent)
    );
    assignedRouteList.appendChild(button);
  });
}

function openAssignedRoute(assignedShippingEvent) {
  if (!/^\d+$/.test(String(assignedShippingEvent || ""))) {
    routePickerMessage.textContent = "That route is invalid.";
    routePickerMessage.classList.add("error");
    return;
  }

  const routeUrl = new URL(window.location.href);
  routeUrl.search = "";
  routeUrl.searchParams.set(
    "shippingEvent",
    String(assignedShippingEvent)
  );
  window.location.replace(routeUrl.toString());
}

function signOutDriver() {
  stopScanner();
  stopManualPhotoCamera();
  stopLocationWatch();
  localStorage.removeItem(DRIVER_SESSION_KEY);

  const cleanUrl = new URL(window.location.href);
  cleanUrl.search = "";
  window.location.replace(cleanUrl.toString());
}

function showMyRoutes() {
  stopScanner();
  stopManualPhotoCamera();

  const routesUrl = new URL(window.location.href);
  routesUrl.search = "";
  routesUrl.searchParams.set("chooseRoute", "1");
  window.location.assign(routesUrl.toString());
}

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

function getMissingCartons() {
  return new Set(
    readStoredJson(MISSING_KEY, []).map(value =>
      String(value).trim().toUpperCase()
    )
  );
}

function rememberMissingCarton(cartonNumber) {
  const missing = getMissingCartons();
  missing.add(String(cartonNumber).trim().toUpperCase());
  writeStoredJson(MISSING_KEY, [...missing]);
}

function forgetMissingCarton(cartonNumber) {
  const normalized = String(cartonNumber).trim().toUpperCase();
  const missing = [...getMissingCartons()].filter(
    value => value !== normalized
  );
  writeStoredJson(MISSING_KEY, missing);
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

    const missing = [...getMissingCartons()].filter(
      cartonNumber => !dropCartonNumbers.has(cartonNumber)
    );
    writeStoredJson(MISSING_KEY, missing);

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
    localStorage.removeItem(MISSING_KEY);
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

function saveLocation(position) {
  latestLocation = {
    latitude: Number(position.coords.latitude),
    longitude: Number(position.coords.longitude),
    accuracy: Math.round(Number(position.coords.accuracy) || 0),
    capturedAt: new Date(
      position.timestamp || Date.now()
    ).toISOString()
  };
  locationPermissionDenied = false;
}

function getLocationMetadata() {
  if (!latestLocation) {
    return {
      latitude: "",
      longitude: "",
      gpsAccuracy: "",
      gpsStatus: "No GPS lock",
      gpsCapturedAt: ""
    };
  }

  return {
    latitude: latestLocation.latitude,
    longitude: latestLocation.longitude,
    gpsAccuracy: latestLocation.accuracy,
    gpsStatus: "GPS lock",
    gpsCapturedAt: latestLocation.capturedAt
  };
}

function startLocationWatch() {
  if (!navigator.geolocation || locationWatchId !== null) return;

  locationWatchId = navigator.geolocation.watchPosition(
    saveLocation,
    error => {
      if (error.code === error.PERMISSION_DENIED) {
        locationPermissionDenied = true;
        stopLocationWatch();
      }
    },
    {
      enableHighAccuracy: true,
      maximumAge: 15000,
      timeout: 15000
    }
  );
}

function stopLocationWatch() {
  if (locationWatchId !== null && navigator.geolocation) {
    navigator.geolocation.clearWatch(locationWatchId);
  }

  locationWatchId = null;
}

function ensureLocationAccess() {
  return new Promise(resolve => {
    if (!navigator.geolocation) {
      latestLocation = null;
      resolve(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        saveLocation(position);
        startLocationWatch();
        resolve(true);
      },
      error => {
        if (error.code === error.PERMISSION_DENIED) {
          locationPermissionDenied = true;
          resolve(false);
          return;
        }

        latestLocation = null;
        startLocationWatch();
        resolve(true);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 15000,
        timeout: 7000
      }
    );
  });
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

function queueSuccessfulScan(cartonNumber, details = {}) {
  const normalizedCartonNumber = String(cartonNumber)
    .trim()
    .toUpperCase();
  const wasReportedMissing =
    getMissingCartons().has(normalizedCartonNumber);
  const driver = readStoredJson(DRIVER_SESSION_KEY, null);

  forgetMissingCarton(normalizedCartonNumber);
  rememberAcceptedCarton(normalizedCartonNumber);

  if (wasReportedMissing) {
    const driverLabel =
      driver?.driverName || driver?.driverId || "Unknown driver";

    queueRecord({
      action: "exception",
      shippingEvent,
      dropId: activeDropId,
      cartonNumber: normalizedCartonNumber,
      exceptionType: "Missing Item Found",
      notes:
        `${driverLabel} ${details.entryMethod === "Manual" ? "manually verified" : "scanned"} a carton previously reported missing.`,
      ...getLocationMetadata()
    });
  }

  queueRecord({
    action: "successfulScan",
    shippingEvent,
    dropId: activeDropId,
    cartonNumber: normalizedCartonNumber,
    entryMethod: details.entryMethod || "Barcode",
    explanation: details.explanation || "",
    tagStatus: details.tagStatus || "",
    photoData: details.photoData || "",
    driverId: details.driverId || driver?.driverId || "",
    ...getLocationMetadata()
  });

  syncPendingRecords();
}

function queueScanException(cartonNumber, exceptionType, notes) {
  const driver = readStoredJson(DRIVER_SESSION_KEY, null);

  queueRecord({
    action: "exception",
    shippingEvent,
    dropId: activeDropId,
    cartonNumber,
    exceptionType,
    notes,
    driverId: driver?.driverId || "",
    ...getLocationMetadata()
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
      keepalive: !submittedQueue.some(record =>
        record.photoData || record.productPhotos || record.damagePhotos
      )
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

  if (requestedScreen === "overview" && activeDropId) {
    openDropOverview(activeDropId);
    return;
  }

  if (requestedScreen === "scan" && activeDropId) {
    openScannerForDrop(activeDropId);
    return;
  }

  showRoutePage();
}

function showRoutePage() {
  stopScanner();
  stopManualPhotoCamera();
  stopLocationWatch();
  document.body.classList.remove("scan-success", "scan-error");
  scannerPage.hidden = true;
  manualEntryPage.hidden = true;
  damageFormPage.hidden = true;
  damageCompletePage.hidden = true;
  dropOverviewPage.hidden = true;
  routePage.hidden = false;
  renderRoutePage();

  const routeUrl = new URL(window.location.href);
  routeUrl.searchParams.set("shippingEvent", shippingEvent);
  routeUrl.searchParams.delete("screen");
  window.history.replaceState({}, "", routeUrl.toString());
}

function openScannerForDrop(dropId, openCamera = false) {
  damageMode = false;
  document.body.classList.remove("damage-mode");
  openDamageScannerButton.textContent = "Report Damage";
  activeDropId = dropId;
  applyActiveDropData();

  routePage.hidden = true;
  dropOverviewPage.hidden = true;
  scannerPage.hidden = false;
  manualEntryPage.hidden = true;
  damageFormPage.hidden = true;
  damageCompletePage.hidden = true;
  document.body.classList.remove("scan-success", "scan-error");

  const scannerUrl = new URL(window.location.href);
  scannerUrl.searchParams.set("shippingEvent", shippingEvent);
  scannerUrl.searchParams.set("dropId", activeDropId);
  scannerUrl.searchParams.set("screen", "scan");
  window.history.replaceState({}, "", scannerUrl.toString());
  window.scrollTo(0, 0);

  if (openCamera) {
    startScanner();
  }
}

function openDropOverview(dropId) {
  stopScanner();
  stopManualPhotoCamera();
  stopLocationWatch();
  activeDropId = dropId;
  routePage.hidden = true;
  scannerPage.hidden = true;
  manualEntryPage.hidden = true;
  damageFormPage.hidden = true;
  damageCompletePage.hidden = true;
  dropOverviewPage.hidden = false;
  renderDropOverview();

  const overviewUrl = new URL(window.location.href);
  overviewUrl.searchParams.set("shippingEvent", shippingEvent);
  overviewUrl.searchParams.set("dropId", activeDropId);
  overviewUrl.searchParams.set("screen", "overview");
  window.history.replaceState({}, "", overviewUrl.toString());
  window.scrollTo(0, 0);
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
    formatRouteDisplayName(routeData.routeName) ||
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

  const knownAccepted = getKnownAcceptedCartons();
  const missingCartons = getMissingCartons();
  const drops = [...dropMap.values()]
    .map(drop => {
      const scannedCount = drop.cartons.filter(carton =>
        knownAccepted.has(
          String(carton.cartonNumber).trim().toUpperCase()
        )
      ).length;
      const missingCount = drop.cartons.filter(carton =>
        {
          const cartonNumber = String(carton.cartonNumber)
            .trim()
            .toUpperCase();
          return (
            missingCartons.has(cartonNumber) &&
            !knownAccepted.has(cartonNumber)
          );
        }
      ).length;
      const complete =
        scannedCount === drop.cartons.length && missingCount === 0;
      const completeWithException =
        !complete &&
        scannedCount + missingCount === drop.cartons.length;
      const finished = complete || completeWithException;
      const started = (scannedCount > 0 || missingCount > 0) && !finished;

      return {
        ...drop,
        scannedCount,
        missingCount,
        complete,
        completeWithException,
        finished,
        started
      };
    })
    .sort((a, b) => {
      const rank = drop =>
        drop.started ? 0 : drop.finished ? 2 : 1;

      return rank(a) - rank(b) || a.dropNumber - b.dropNumber;
    });

  dropListBox.replaceChildren();

  drops.forEach(drop => {
    const card = document.createElement("article");
    const details = document.createElement("div");
    const number = document.createElement("span");
    const progress = document.createElement("span");
    const customers = document.createElement("div");
    const cartonTypes = document.createElement("div");
    const actions = document.createElement("div");
    const scanButton = document.createElement("button");
    const overviewButton = document.createElement("button");

    card.className = "drop-card";

    if (drop.complete) card.classList.add("complete");
    if (drop.completeWithException) {
      card.classList.add("complete-with-exception");
    }
    if (drop.started) card.classList.add("in-progress");

    details.className = "drop-card-details";
    number.className = "drop-number";
    progress.className = "drop-progress";
    customers.className = "customer-list";
    cartonTypes.className = "carton-types";
    actions.className = "drop-card-actions";
    scanButton.className = "drop-action-button scan-drop-button";
    overviewButton.className = "drop-action-button overview-button";

    number.textContent = `Drop ${drop.dropNumber}`;
    progress.textContent = drop.complete
      ? "COMPLETE"
      : drop.completeWithException
        ? `COMPLETE · ${drop.missingCount} MISSING`
      : drop.started
        ? `IN PROGRESS · ${drop.scannedCount}/${drop.cartons.length}` +
          (drop.missingCount ? ` · ${drop.missingCount} MISSING` : "")
        : `${drop.cartons.length} CARTONS`;

    (drop.customers.length ? drop.customers : ["Unknown customer"])
      .forEach(name => {
        const customer = document.createElement("div");
        customer.className = "customer-name";
        customer.textContent = name;
        customers.append(customer);
      });

    cartonTypes.textContent = formatCartonTypes(drop.cartons);

    overviewButton.type = "button";
    overviewButton.textContent = "Drop Overview";
    overviewButton.addEventListener("click", () =>
      openDropOverview(drop.dropId)
    );

    if (!drop.finished) {
      scanButton.type = "button";
      scanButton.textContent = drop.started ? "Resume Drop" : "Start Drop";
      scanButton.addEventListener("click", () =>
        openScannerForDrop(drop.dropId, true)
      );
      actions.append(scanButton);
    }

    actions.append(overviewButton);
    details.append(number, progress, customers, cartonTypes);
    card.append(details, actions);
    dropListBox.append(card);
  });

  if (!dropOverviewPage.hidden && activeDropId) {
    renderDropOverview();
  }

  renderPendingSync();
}

function renderDropOverview() {
  if (!routeData || !activeDropId) return;

  const cartons = routeData.cartons.filter(
    carton => carton.dropId === activeDropId
  );

  if (!cartons.length) return;

  const accepted = getKnownAcceptedCartons();
  const missing = getMissingCartons();
  const damaged = getDamagedCartons();
  const scannedCount = cartons.filter(carton =>
    accepted.has(String(carton.cartonNumber).trim().toUpperCase())
  ).length;
  const missingCount = cartons.filter(carton =>
    {
      const cartonNumber = String(carton.cartonNumber)
        .trim()
        .toUpperCase();
      return missing.has(cartonNumber) && !accepted.has(cartonNumber);
    }
  ).length;
  const customerNames = [...new Set(
    cartons.map(carton => cleanCustomerName(carton.customer))
  )];
  const dropNumber = cartons[0].dropNumber;

  overviewDropName.textContent =
    `Drop ${dropNumber} · ${customerNames.join(" / ")}`;
  overviewProgress.textContent =
    `${scannedCount} scanned · ${missingCount} missing · ` +
    `${cartons.length - scannedCount - missingCount} remaining`;
  overviewScanButton.textContent =
    scannedCount || missingCount ? "Resume Scanner" : "Start Scanner";
  overviewCartonList.replaceChildren();

  const orderedCartons = [...cartons].sort((a, b) => {
    const statusRank = carton => {
      const number = String(carton.cartonNumber).trim().toUpperCase();
      if (missing.has(number)) return 0;
      if (!accepted.has(number)) return 1;
      return 2;
    };

    return (
      statusRank(a) - statusRank(b) ||
      String(a.cartonNumber).localeCompare(String(b.cartonNumber))
    );
  });

  orderedCartons.forEach(carton => {
    const cartonNumber = String(carton.cartonNumber)
      .trim()
      .toUpperCase();
    const isScanned = accepted.has(cartonNumber);
    const isMissing = missing.has(cartonNumber) && !isScanned;
    const isDamaged = damaged.has(cartonNumber);
    const row = document.createElement("article");
    const heading = document.createElement("div");
    const number = document.createElement("strong");
    const status = document.createElement("span");
    const type = document.createElement("div");
    const description = document.createElement("div");

    row.className = "carton-row";
    if (isScanned) row.classList.add("scanned");
    if (isMissing) row.classList.add("missing");
    heading.className = "carton-row-heading";
    status.className = "carton-status";
    type.className = "carton-type-detail";
    description.className = "carton-description";

    number.textContent = cartonNumber;
    status.textContent = isDamaged && isScanned
      ? "SCANNED · DAMAGE REPORTED"
      : isMissing
      ? "MISSING"
      : isScanned
        ? "SCANNED"
        : "NOT SCANNED";
    type.textContent = carton.cartonType || "Carton type unavailable";
    description.textContent =
      carton.description || "No description available";

    heading.append(number, status);
    row.append(heading, type, description);

    const cartonActions = document.createElement("div");
    cartonActions.className = "carton-report-actions";
    const damageButton = document.createElement("button");
    damageButton.type = "button";
    damageButton.className = "report-damage-button";
    damageButton.textContent = isDamaged ? "Report More Damage" : "Report Damage";
    damageButton.disabled = isMissing;
    damageButton.addEventListener("click", () => openDamageForm(carton, "overview"));
    cartonActions.append(damageButton);

    if (!isScanned && !isMissing) {
      const missingButton = document.createElement("button");
      missingButton.type = "button";
      missingButton.className = "report-missing-button";
      missingButton.textContent = "Report Missing From Truck";
      missingButton.addEventListener("click", () =>
        reportMissingCarton(carton)
      );
      cartonActions.append(missingButton);
    }

    row.append(cartonActions);

    overviewCartonList.append(row);
  });
}

function getDamagedCartons() {
  return new Set(readStoredJson(DAMAGED_KEY, []));
}

function rememberDamagedCarton(cartonNumber) {
  const damaged = getDamagedCartons();
  damaged.add(String(cartonNumber).trim().toUpperCase());
  writeStoredJson(DAMAGED_KEY, [...damaged]);
}

async function openDamageScanner() {
  damageMode = true;
  selectedDamageCarton = null;
  damageFormPage.hidden = true;
  damageCompletePage.hidden = true;
  routePage.hidden = true;
  dropOverviewPage.hidden = true;
  manualEntryPage.hidden = true;
  scannerPage.hidden = false;
  document.body.classList.add("damage-mode");
  dropIdBox.textContent = "REPORT DAMAGE";
  statusBox.textContent = "Scan the damaged carton";
  resultBox.textContent = "None";
  openDamageScannerButton.textContent = "Damage Mode Active";
  window.scrollTo(0, 0);
  await startScanner();
}

function openDamageForm(carton, returnScreen = "overview") {
  stopScanner();
  selectedDamageCarton = carton;
  damageReturnScreen = returnScreen;
  scannerPage.hidden = true;
  routePage.hidden = true;
  dropOverviewPage.hidden = true;
  manualEntryPage.hidden = true;
  damageCompletePage.hidden = true;
  damageFormPage.hidden = false;
  document.body.classList.remove("damage-mode", "scan-success", "scan-error");

  damageCartonNumber.textContent = String(carton.cartonNumber).toUpperCase();
  damageCartonDetails.textContent = [
    `Drop ${carton.dropNumber}`,
    cleanCustomerName(carton.customer),
    carton.cartonType || "Carton",
    carton.description || "No description available"
  ].join(" · ");
  resetDamageForm();
  window.scrollTo(0, 0);
}

function resetDamageForm() {
  damageForm.reset();
  document.getElementById("damage-type").value = "Bent/Dented";
  productPhotos = new Map();
  damagePhotos = [];
  damageFormMessage.textContent = "";
  productPhotoFields.replaceChildren();
  ["Product side", "Opposite side", "First end", "Opposite end"].forEach(label => {
    const wrapper = document.createElement("div");
    wrapper.className = "damage-photo-slot";
    const cameraLabel = document.createElement("label");
    const title = document.createElement("span");
    const cameraInput = document.createElement("input");
    const libraryInput = document.createElement("input");
    const libraryButton = document.createElement("button");
    title.textContent = label;
    cameraInput.type = "file";
    cameraInput.accept = "image/*";
    cameraInput.capture = "environment";
    libraryInput.type = "file";
    libraryInput.accept = "image/*";
    libraryButton.type = "button";
    libraryButton.className = "photo-library-button";
    libraryButton.setAttribute("aria-label", `Choose ${label} from photos`);
    libraryButton.textContent = "🖼️";
    libraryButton.addEventListener("click", event => {
      event.stopPropagation();
      libraryInput.click();
    });
    const saveProductPhoto = async input => {
      const file = input.files?.[0];
      if (!file) return;
      productPhotos.set(label, await imageFileToDataUrl(file));
      wrapper.classList.add("complete");
      title.textContent = `✓ ${label}`;
      input.value = "";
    };
    cameraInput.addEventListener("change", () => saveProductPhoto(cameraInput));
    libraryInput.addEventListener("change", () => saveProductPhoto(libraryInput));
    cameraLabel.append(title, cameraInput);
    wrapper.append(cameraLabel, libraryInput, libraryButton);
    productPhotoFields.append(wrapper);
  });
  renderDamagePhotoCount();
  updateDamageDescriptionCount();
}

function cancelDamageForm() {
  if (damageReturnScreen === "scanner") openDamageScanner();
  else openDropOverview(activeDropId);
}

function updateDamageDescriptionCount() {
  const count = damageDescription.value.trim().length;
  damageDescriptionCount.textContent = count >= 5
    ? `${count} characters · ready`
    : `${count} of 5 minimum characters`;
}

async function addSelectedDamagePhotos() {
  const sourceInput = damageCameraInput.files?.length
    ? damageCameraInput
    : damagePhotoInput;
  const files = [...(sourceInput.files || [])];
  for (const file of files) damagePhotos.push(await imageFileToDataUrl(file));
  sourceInput.value = "";
  renderDamagePhotoCount();
}

function renderDamagePhotoCount() {
  damagePhotoCount.textContent = `${damagePhotos.length} damage photo${damagePhotos.length === 1 ? "" : "s"} added · minimum 2`;
  damagePhotoPreviews.replaceChildren(...damagePhotos.map((src, index) => {
    const item = document.createElement("div");
    const image = document.createElement("img");
    const remove = document.createElement("button");
    image.src = src;
    image.alt = `Damage photo ${index + 1}`;
    remove.type = "button";
    remove.textContent = "×";
    remove.addEventListener("click", () => {
      damagePhotos.splice(index, 1);
      renderDamagePhotoCount();
    });
    item.append(image, remove);
    return item;
  }));
}

function imageFileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);
    image.onload = () => {
      const maxEdge = 1600;
      const scale = Math.min(1, maxEdge / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.naturalWidth * scale);
      canvas.height = Math.round(image.naturalHeight * scale);
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL("image/jpeg", 0.72));
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("This photo could not be opened. Try taking a new photo."));
    };
    image.src = objectUrl;
  });
}

function meaningfulLength(value) {
  return String(value || "").replace(/[^a-z0-9]/gi, "").length;
}

function submitDamageReport(event) {
  event.preventDefault();
  if (!selectedDamageCarton) return;
  const description = damageDescription.value.trim();
  const disposition = document.getElementById("customer-disposition").value;
  if (meaningfulLength(description) < 5) {
    damageFormMessage.textContent = "Enter at least 5 meaningful characters describing the damage.";
    return;
  }
  if (productPhotos.size !== 4) {
    damageFormMessage.textContent = "Add each of the four labeled product photos.";
    return;
  }
  if (damagePhotos.length < 2) {
    damageFormMessage.textContent = "Add at least two close-up damage photos.";
    return;
  }
  if (!disposition) {
    damageFormMessage.textContent = "Select the customer disposition.";
    return;
  }

  const cartonNumber = String(selectedDamageCarton.cartonNumber).trim().toUpperCase();
  const driver = readStoredJson(DRIVER_SESSION_KEY, null);
  queueRecord({
    action: "damageReport",
    shippingEvent,
    dropId: activeDropId,
    cartonNumber,
    driverId: driver?.driverId || "",
    damageType: document.getElementById("damage-type").value,
    estimatedPanels: document.getElementById("damage-panel-count").value,
    description,
    disposition,
    productPhotos: [...productPhotos.entries()].map(([label, data]) => ({ label, data })),
    damagePhotos,
    ...getLocationMetadata()
  });
  rememberAcceptedCarton(cartonNumber);
  rememberDamagedCarton(cartonNumber);
  scannedCartons.add(cartonNumber);
  syncPendingRecords();
  renderRoutePage();
  damageFormPage.hidden = true;
  damageCompletePage.hidden = false;
  damageCompleteSummary.textContent = `${cartonNumber} · ${disposition}`;
  window.scrollTo(0, 0);
}

function reportMissingCarton(carton) {
  const cartonNumber = String(carton.cartonNumber)
    .trim()
    .toUpperCase();
  const confirmed = window.confirm(
    `REPORT MISSING\n\n${cartonNumber}\n\n` +
    "Confirm this carton is not on the truck."
  );

  if (!confirmed) return;

  const driver = readStoredJson(DRIVER_SESSION_KEY, null);
  const driverLabel =
    driver?.driverName || driver?.driverId || "Unknown driver";

  rememberMissingCarton(cartonNumber);
  queueScanException(
    cartonNumber,
    "Missing From Truck",
    `${driverLabel} reported carton missing from truck.`
  );
  renderDropOverview();
  renderRoutePage();
}

async function openManualEntry() {
  if (!activeDropId) return;

  const locationAllowed = await ensureLocationAccess();

  if (!locationAllowed || locationPermissionDenied) {
    alert(
      "TrackMaster needs location permission before manual entry.\n\n" +
      "Open this site in Settings, allow location access, then try again."
    );
    return;
  }

  stopScanner();
  scannerPage.hidden = true;
  manualEntryPage.hidden = false;
  manualEntryMessage.textContent = "";
  manualCartonNumber.value = "";
  manualExplanation.value = "";
  manualPhotos = [];
  manualEntryForm.querySelector(
    'input[name="tag-status"][value="Won\'t Scan"]'
  ).checked = true;
  updateManualExplanationCount();
  updateManualPhotoInstructions();
  window.scrollTo(0, 0);

  try {
    await startManualPhotoCamera();
    manualCartonNumber.focus();
  } catch (error) {
    manualEntryMessage.textContent =
      "Camera access is required for manual entry.";
    submitManualEntryButton.disabled = true;
  }
}

function closeManualEntry() {
  stopManualPhotoCamera();
  manualEntryPage.hidden = true;
  scannerPage.hidden = false;
  submitManualEntryButton.disabled = false;
  openScannerForDrop(activeDropId, true);
}

async function startManualPhotoCamera() {
  stopManualPhotoCamera();

  manualPhotoStream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: { ideal: "environment" },
      width: { ideal: 1280 },
      height: { ideal: 720 }
    },
    audio: false
  });

  manualPhotoCamera.srcObject = manualPhotoStream;
  await manualPhotoCamera.play();
  submitManualEntryButton.disabled = false;
}

function stopManualPhotoCamera() {
  manualPhotoStream?.getTracks?.().forEach(track => track.stop());
  manualPhotoStream = null;
  manualPhotoCamera.srcObject = null;
}

function captureManualPhoto() {
  const requiredPhotos = getRequiredManualPhotoLabels();

  if (manualPhotos.length >= requiredPhotos.length) {
    resetManualPhotos();
    return;
  }

  const sourceWidth = manualPhotoCamera.videoWidth;
  const sourceHeight = manualPhotoCamera.videoHeight;

  if (!sourceWidth || !sourceHeight) {
    manualEntryMessage.textContent =
      "Wait for the camera image, then take the photo.";
    return;
  }

  const maximumWidth = 960;
  const scale = Math.min(1, maximumWidth / sourceWidth);
  manualPhotoCanvas.width = Math.round(sourceWidth * scale);
  manualPhotoCanvas.height = Math.round(sourceHeight * scale);

  const context = manualPhotoCanvas.getContext("2d");
  context.drawImage(
    manualPhotoCamera,
    0,
    0,
    manualPhotoCanvas.width,
    manualPhotoCanvas.height
  );

  const photoData = manualPhotoCanvas.toDataURL("image/jpeg", 0.68);
  manualPhotos.push(photoData);
  manualPhotoPreview.src = photoData;
  manualEntryMessage.textContent =
    `${requiredPhotos[manualPhotos.length - 1]} photo captured.`;
  updateManualPhotoInstructions();
}

function updateManualExplanationCount() {
  const meaningfulCharacters = manualExplanation.value
    .replace(/[^a-z0-9]/gi, "")
    .length;
  manualExplanationCount.textContent =
    meaningfulCharacters >= 10
      ? "Explanation accepted"
      : `${10 - meaningfulCharacters} more letters or numbers required`;
}

function getSelectedTagStatus() {
  return manualEntryForm.querySelector(
    'input[name="tag-status"]:checked'
  )?.value || "Won't Scan";
}

function getRequiredManualPhotoLabels() {
  return getSelectedTagStatus() === "Won't Scan"
    ? ["Tag/barcode"]
    : ["Product side", "Opposite side", "First end", "Opposite end"];
}

function resetManualPhotos() {
  manualPhotos = [];
  manualPhotoPreview.hidden = true;
  manualPhotoCamera.hidden = false;
  captureManualPhotoButton.textContent = "Take Required Photo";
  manualEntryMessage.textContent = "";
  updateManualPhotoInstructions();
}

function updateManualPhotoInstructions() {
  const tagStatus = getSelectedTagStatus();
  const requiredPhotos = getRequiredManualPhotoLabels();
  const nextLabel = requiredPhotos[manualPhotos.length];
  const complete = manualPhotos.length === requiredPhotos.length;

  manualExplanationSection.hidden = tagStatus !== "Other";
  manualPhotoSection.hidden = false;
  manualPhotoProgress.textContent =
    `${manualPhotos.length} of ${requiredPhotos.length} photos captured`;

  if (complete) {
    manualPhotoHelp.textContent = "Required photos complete.";
    manualPhotoPreview.hidden = false;
    manualPhotoCamera.hidden = true;
    captureManualPhotoButton.textContent =
      requiredPhotos.length === 1 ? "Retake Photo" : "Start Photos Over";
    return;
  }

  manualPhotoPreview.hidden = true;
  manualPhotoCamera.hidden = false;
  captureManualPhotoButton.textContent = `Take ${nextLabel} Photo`;
  manualPhotoHelp.textContent = tagStatus === "Won't Scan"
    ? "Photograph the carton tag and unreadable barcode."
    : `Required angle: ${nextLabel}.`;
}

function showManualValidationError(message) {
  manualEntryMessage.textContent = message;
  window.scrollTo(0, 0);
}

function stopManualEntryForWrongCarton(title, message) {
  stopManualPhotoCamera();
  manualEntryPage.hidden = true;
  scannerPage.hidden = false;
  hardStop(title, message);
}

function submitManualEntry(event) {
  event.preventDefault();

  const digits = manualCartonNumber.value.replace(/\D/g, "");
  const cartonNumber = `C${digits}`;
  const explanation = manualExplanation.value.trim();
  const tagStatus = getSelectedTagStatus();
  const requiredPhotoCount = getRequiredManualPhotoLabels().length;
  const meaningfulCharacters = explanation
    .replace(/[^a-z0-9]/gi, "")
    .length;

  if (!digits) {
    showManualValidationError("Enter the carton number.");
    return;
  }

  if (tagStatus === "Other" && meaningfulCharacters < 10) {
    showManualValidationError(
      "Enter a useful explanation with at least 10 letters or numbers."
    );
    return;
  }

  if (manualPhotos.length !== requiredPhotoCount) {
    showManualValidationError(
      `Take all ${requiredPhotoCount} required live photos.`
    );
    return;
  }

  const carton = cartonLookup.get(cartonNumber);

  if (!carton) {
    queueScanException(
      cartonNumber,
      "Wrong Route",
      `Manually entered at ${activeDropId}, but it is not assigned to Shipping Event ${shippingEvent}.`
    );
    stopManualEntryForWrongCarton(
      "WRONG ROUTE",
      `${cartonNumber}\n\nThis carton is not assigned to this route.`
    );
    return;
  }

  if (carton.dropId !== activeDropId) {
    queueScanException(
      cartonNumber,
      "Wrong Drop",
      `Manually entered at ${activeDropId}; assigned to ${carton.dropId}, Drop ${carton.dropNumber}, ${carton.customer}.`
    );
    stopManualEntryForWrongCarton(
      "WRONG DROP",
      `${cartonNumber} belongs to Drop ${carton.dropNumber}\n${cleanCustomerName(carton.customer)}`
    );
    return;
  }

  if (damageMode) {
    openDamageForm(carton, "scanner");
    return;
  }

  if (scannedCartons.has(cartonNumber)) {
    showManualValidationError(`${cartonNumber} is already scanned.`);
    playDuplicateBeep();
    return;
  }

  const driver = readStoredJson(DRIVER_SESSION_KEY, null);

  try {
    queueSuccessfulScan(cartonNumber, {
      entryMethod: "Manual",
      explanation,
      tagStatus,
      photoData: manualPhotos,
      driverId: driver?.driverId || ""
    });
  } catch (error) {
    showManualValidationError(
      "The phone could not store this manual entry. Try again."
    );
    return;
  }

  scannedCartons.add(cartonNumber);
  stopManualPhotoCamera();
  manualEntryPage.hidden = true;
  scannerPage.hidden = false;
  applyActiveDropData();
  resultBox.textContent = cartonNumber;
  statusBox.textContent = `Manual entry accepted: ${cartonNumber}`;
  updateProgress();
  renderRoutePage();
  playBeep();
  startScanner();
}

function identifyDamageCarton(cartonNumber, returnScreen = "scanner") {
  if (!/^C\d+$/.test(cartonNumber)) {
    alert("Enter a valid carton number beginning with C.");
    return;
  }
  const carton = cartonLookup.get(cartonNumber);
  if (!carton) {
    queueScanException(
      cartonNumber,
      "Wrong Route",
      `Carton manually entered in Damage Mode at ${activeDropId}, but it is not assigned to Shipping Event ${shippingEvent}.`
    );
    alert("WRONG ROUTE\n\nThis carton is not assigned to this route.");
    return;
  }
  if (carton.dropId !== activeDropId) {
    queueScanException(
      cartonNumber,
      "Wrong Drop",
      `Damage Mode manual entry at ${activeDropId}; assigned to ${carton.dropId}.`
    );
    alert(`WRONG DROP\n\n${cartonNumber} belongs to Drop ${carton.dropNumber}.`);
    return;
  }
  openDamageForm(carton, returnScreen);
}

function cleanCustomerName(value) {
  return String(value || "Unknown customer")
    .replace(/^.*?\*\s*JOBSITE\s*\*\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function formatRouteDisplayName(value) {
  const original = String(value || "").trim();

  if (!original) return "";

  return original
    .replace(/^AUB\s*-\s*/i, "")
    .replace(
      /\s*-\s*\d{1,2}\/\d{1,2}\/\d{2,4}\s*-\s*(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)(?:day)?\s*$/i,
      ""
    )
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

  statusBox.textContent = "Checking location permission…";
  const locationAllowed = await ensureLocationAccess();

  if (!locationAllowed || locationPermissionDenied) {
    startButton.disabled = false;
    startButton.textContent = "Location Settings Required";
    statusBox.textContent = "LOCATION PERMISSION REQUIRED";
    alert(
      "TrackMaster needs location permission before opening the scanner.\n\n" +
      "Open this site in Settings, allow location access, then try again."
    );
    return;
  }

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
    statusBox.textContent = "Ready — scan carton barcode";
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
