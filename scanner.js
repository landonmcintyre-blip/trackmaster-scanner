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
const resetButton = document.getElementById("overview-reset-button");
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
const inProgressSection = document.getElementById("in-progress-section");
const inProgressList = document.getElementById("in-progress-list");
const scannerCartonList = document.getElementById("scanner-carton-list");
const unableDeliveryButton = document.getElementById("unable-delivery-button");
const cartonWorkflowPage = document.getElementById("carton-workflow-page");
const cartonWorkflowTitle = document.getElementById("carton-workflow-title");
const cartonWorkflowDetails = document.getElementById("carton-workflow-details");
const cartonPhotoFields = document.getElementById("carton-photo-fields");
const cartonWorkflowMessage = document.getElementById("carton-workflow-message");
const unknownTypePanel = document.getElementById("unknown-type-panel");
const assignedCartonType = document.getElementById("assigned-carton-type");
const continueCartonWorkflowButton = document.getElementById("continue-carton-workflow");
const discardCartonWorkflowButton = document.getElementById("discard-carton-workflow");
const bundlePromptPage = document.getElementById("bundle-prompt-page");
const bundleMoreButton = document.getElementById("bundle-more-button");
const bundleMorePanel = document.getElementById("bundle-more-panel");
const bundleMoreCount = document.getElementById("bundle-more-count");
const bundleMoreNext = document.getElementById("bundle-more-next");
const finalizePage = document.getElementById("finalize-page");
const finalizeCameraInput = document.getElementById("finalize-camera-input");
const finalizeLibraryInput = document.getElementById("finalize-library-input");
const finalizePhotoPreviews = document.getElementById("finalize-photo-previews");
const finalizeMessage = document.getElementById("finalize-message");
const unableDeliveryPage = document.getElementById("unable-delivery-page");
const unableDeliveryForm = document.getElementById("unable-delivery-form");
const unableReason = document.getElementById("unable-reason");
const unableExplanationPanel = document.getElementById("unable-explanation-panel");
const unableExplanation = document.getElementById("unable-explanation");
const unablePhotoPanel = document.getElementById("unable-photo-panel");
const unablePhotoFields = document.getElementById("unable-photo-fields");
const rejectionCustomerPanel = document.getElementById("rejection-customer-panel");
const unableMessage = document.getElementById("unable-message");
const signatureDialog = document.getElementById("signature-dialog");
const signatureCanvas = document.getElementById("signature-canvas");
const signaturePreview = document.getElementById("signature-preview");

const API_URL =
  "https://script.google.com/macros/s/AKfycby-XWD-6dWtzXHG1PtTy03Km326GsCmy3j4aKjJwa-0mRQI1w73iAsqc1ocr8XLeuEYog/exec";

const LAST_ROUTE_KEY = "trackmaster-last-route";
const SYNC_QUEUE_KEY = "trackmaster-sync-queue";
const DRIVER_SESSION_KEY = "trackmaster-driver-session";
const SAVED_PHONE_KEY = "trackmaster-saved-phone";
const APP_BUILD = "28.3";

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
const DRAFTS_KEY = `trackmaster-drafts-${shippingEvent || "missing"}`;
const GROUPS_KEY = `trackmaster-bundle-groups-${shippingEvent || "missing"}`;
const METHODS_KEY = `trackmaster-scan-methods-${shippingEvent || "missing"}`;
const COMPLETIONS_KEY = `trackmaster-completions-${shippingEvent || "missing"}`;
const UNDELIVERED_KEY = `trackmaster-undelivered-${shippingEvent || "missing"}`;

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
let activeCartonDraft = null;
let attachedMode = null;
let finalizePhotos = [];
let unablePhotos = new Map();
let customerSignature = "";

const PHOTO_TOKEN_PREFIX = "tmphoto:";
let photoDatabasePromise = null;

function openPhotoDatabase() {
  if (photoDatabasePromise) return photoDatabasePromise;
  photoDatabasePromise = new Promise((resolve, reject) => {
    const request = indexedDB.open("trackmaster-v27", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("photos");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return photoDatabasePromise;
}

async function storePhotoData(data) {
  const id = createRecordId(); const db = await openPhotoDatabase();
  await new Promise((resolve, reject) => { const tx = db.transaction("photos", "readwrite"); tx.objectStore("photos").put(data, id); tx.oncomplete = resolve; tx.onerror = () => reject(tx.error); });
  return `${PHOTO_TOKEN_PREFIX}${id}`;
}

async function loadPhotoData(value) {
  if (!String(value || "").startsWith(PHOTO_TOKEN_PREFIX)) return value;
  const db = await openPhotoDatabase(), id = String(value).slice(PHOTO_TOKEN_PREFIX.length);
  return new Promise((resolve, reject) => { const request = db.transaction("photos").objectStore("photos").get(id); request.onsuccess = () => resolve(request.result || ""); request.onerror = () => reject(request.error); });
}

async function materializePhotoTokens(value) {
  if (typeof value === "string") return loadPhotoData(value);
  if (Array.isArray(value)) return Promise.all(value.map(materializePhotoTokens));
  if (value && typeof value === "object") { const output = {}; for (const [key, item] of Object.entries(value)) output[key] = await materializePhotoTokens(item); return output; }
  return value;
}

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
  if (!activeDropId) return;
  if (overviewScanButton.dataset.action === "finalize") openFinalizeDelivery();
  else if (overviewScanButton.dataset.action === "reopen") reopenUndeliveredDrop();
  else if (overviewScanButton.dataset.action === "draft") {
    const draft = Object.values(getDrafts()).find(item => item.dropId === activeDropId);
    if (draft) showCartonWorkflow(draft);
  }
  else openScannerForDrop(activeDropId, true);
});
scannerOverviewButton.addEventListener("click", () => {
  if (attachedMode) {
    stopScanner();
    scannerPage.hidden = true;
    bundlePromptPage.hidden = false;
    return;
  }
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
continueCartonWorkflowButton.addEventListener("click", continueCartonWorkflow);
discardCartonWorkflowButton.addEventListener("click", discardActiveDraft);
document.getElementById("carton-workflow-back").addEventListener("click", () => openDropOverview(activeDropId));
document.querySelectorAll("[data-bundle-extra]").forEach(button => button.addEventListener("click", () => chooseBundleExtra(Number(button.dataset.bundleExtra))));
bundleMoreButton.addEventListener("click", () => { bundleMorePanel.hidden = false; bundleMoreCount.focus(); });
bundleMoreNext.addEventListener("click", () => chooseBundleExtra(Number(bundleMoreCount.value)));
document.getElementById("bundle-prompt-back").addEventListener("click", () => showCartonWorkflow(activeCartonDraft));
assignedCartonType.addEventListener("change", () => { if (activeCartonDraft) { activeCartonDraft.cartonType = assignedCartonType.value; activeCartonDraft.driverAssignedType = true; activeCartonDraft.photos = {}; saveActiveDraft(); renderCartonPhotoFields(); } });
unableDeliveryButton.addEventListener("click", openUnableDelivery);
document.getElementById("unable-back").addEventListener("click", () => openDropOverview(activeDropId));
unableReason.addEventListener("change", configureUnableDeliveryForm);
unableDeliveryForm.addEventListener("submit", submitUnableDelivery);
document.getElementById("finalize-back").addEventListener("click", () => openDropOverview(activeDropId));
document.getElementById("take-finalize-photo").addEventListener("click", () => finalizeCameraInput.click());
document.getElementById("add-finalize-photos").addEventListener("click", () => finalizeLibraryInput.click());
finalizeCameraInput.addEventListener("change", addFinalizePhotos);
finalizeLibraryInput.addEventListener("change", addFinalizePhotos);
document.getElementById("complete-delivery-button").addEventListener("click", completeDelivery);
document.getElementById("open-signature-button").addEventListener("click", openSignatureDialog);
document.getElementById("clear-signature").addEventListener("click", clearSignature);
document.getElementById("accept-signature").addEventListener("click", acceptSignature);
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
    routePickerMessage.textContent = "Finding assigned routes…";
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
      "No routes are assigned to you within the 7-day window.";
    assignedRouteList.innerHTML = "";
    return;
  }

  routePickerMessage.textContent = fromCache
    ? "Offline assignments ready — choose a route."
    : "Choose a route to begin.";
  assignedRouteList.innerHTML = "";

  const today = new Date();
  const localKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const groups = [
    ["Today", routes.filter(route => (route.routeDateKey || "") === localKey)],
    ["Upcoming", routes.filter(route => (route.routeDateKey || "") > localKey).sort((a, b) => String(a.routeDateKey).localeCompare(String(b.routeDateKey)))],
    ["Previous", routes.filter(route => (route.routeDateKey || "") < localKey).sort((a, b) => String(b.routeDateKey).localeCompare(String(a.routeDateKey)))]
  ];
  groups.forEach(([label, groupRoutes]) => {
    if (!groupRoutes.length) return;
    const heading = document.createElement("h2"); heading.className = "route-group-heading"; heading.textContent = label; assignedRouteList.appendChild(heading);
    groupRoutes.forEach(route => {
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
  routeUrl.searchParams.set("v", APP_BUILD);
  window.location.replace(routeUrl.toString());
}

function signOutDriver() {
  signatureDialog.hidden = true;
  stopScanner();
  stopManualPhotoCamera();
  stopLocationWatch();
  localStorage.removeItem(DRIVER_SESSION_KEY);

  const cleanUrl = new URL(window.location.href);
  cleanUrl.search = "";
  cleanUrl.searchParams.set("logout", "1");
  cleanUrl.searchParams.set("v", APP_BUILD);
  window.location.replace(cleanUrl.toString());
}

function showMyRoutes() {
  stopScanner();
  stopManualPhotoCamera();

  const routesUrl = new URL(window.location.href);
  routesUrl.search = "";
  routesUrl.searchParams.set("chooseRoute", "1");
  routesUrl.searchParams.set("v", APP_BUILD);
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
    "TEST: RESET ENTIRE DELIVERY?\n\nThis will erase all activity for this drop and return it to an untouched state."
  );

  if (!confirmed) return;
  stopScanner();
  resetButton.disabled = true;
  resetButton.textContent = "Resetting…";
  clearLocalDropScanData();
  const dropNumbers = new Set(routeData.cartons.filter(c => c.dropId === activeDropId).map(c => String(c.cartonNumber).toUpperCase()));
  const pruneMap = key => { const map = readStoredJson(key, {}); Object.keys(map).forEach(number => { if (dropNumbers.has(number) || map[number]?.dropId === activeDropId) delete map[number]; }); writeStoredJson(key, map); };
  pruneMap(DRAFTS_KEY); pruneMap(GROUPS_KEY); pruneMap(METHODS_KEY);
  const damaged = [...getDamagedCartons()].filter(n => !dropNumbers.has(n)); writeStoredJson(DAMAGED_KEY, damaged);
  const completions = getCompletions(); delete completions[activeDropId]; writeStoredJson(COMPLETIONS_KEY, completions);
  const undelivered = getUndelivered(); delete undelivered[activeDropId]; writeStoredJson(UNDELIVERED_KEY, undelivered);
  localStorage.removeItem(finalizeDraftKey());
  const queue = readStoredJson(SYNC_QUEUE_KEY, []).filter(record => !(record.shippingEvent === shippingEvent && record.dropId === activeDropId));
  writeStoredJson(SYNC_QUEUE_KEY, queue);
  queueRecord({ action: "resetDelivery", shippingEvent, dropId: activeDropId });
  syncPendingRecords(); routeDataGeneration++; applyRouteData(routeData); applyActiveDropData(); renderRoutePage(); openDropOverview(activeDropId);
  resetButton.disabled = false; resetButton.textContent = "TEST: Reset Delivery";
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
    productPhotos: details.productPhotos || {},
    bundleAssociationId: details.bundleAssociationId || "",
    associatedCartons: details.associatedCartons || [],
    cartonType: details.cartonType || "",
    driverAssignedType: Boolean(details.driverAssignedType),
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
    const uploadQueue = await materializePhotoTokens(submittedQueue);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "syncBatch",
        records: uploadQueue
      }),
      keepalive: !submittedQueue.some(record =>
        record.photoData || record.productPhotos || record.damagePhotos || record.photos || record.rejection?.signature
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
  hideV27Pages();
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
  hideV27Pages();
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
  hideV27Pages();
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
  renderScannerCartonList();
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
  const completionRecords = getCompletions();
  const undeliveredRecords = getUndelivered();
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
      const completionRecord = completionRecords[drop.dropId];
      const undeliveredRecord = undeliveredRecords[drop.dropId];
      const complete = Boolean(completionRecord);
      const completeWithException = complete && missingCount > 0;
      const finished = complete || Boolean(undeliveredRecord);
      const started = (scannedCount > 0 || missingCount > 0) && !finished;

      return {
        ...drop,
        scannedCount,
        missingCount,
        complete,
        completeWithException,
        finished,
        started,
        undeliveredRecord,
        finishedAt: completionRecord?.completedAt || undeliveredRecord?.recordedAt || ""
      };
    })
    .sort((a, b) => {
      const rank = drop =>
        drop.started ? 0 : drop.finished ? 2 : 1;

      return rank(a) - rank(b) || (a.finished && b.finished ? String(a.finishedAt).localeCompare(String(b.finishedAt)) : a.dropNumber - b.dropNumber);
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
    card.addEventListener("click", event => {
      if (event.target.closest("button")) return;
      openDropOverview(drop.dropId);
    });

    if (drop.complete) card.classList.add("complete");
    if (drop.completeWithException) {
      card.classList.add("complete-with-exception");
    }
    if (drop.undeliveredRecord) card.classList.add("complete-with-exception");
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
    progress.textContent = drop.undeliveredRecord
      ? drop.undeliveredRecord.status.toUpperCase()
      : drop.complete
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
  const drafts = Object.values(getDrafts()).filter(draft => draft.dropId === activeDropId);
  const undelivered = getUndelivered()[activeDropId];
  const completion = getCompletions()[activeDropId];
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
  const allAccounted = scannedCount + missingCount === cartons.length && !drafts.length;
  overviewScanButton.dataset.action = allAccounted ? "finalize" : drafts.length ? "draft" : "scan";
  overviewScanButton.textContent = completion ? "✓ Delivery Complete" : undelivered ? "Reopen Delivery" : allAccounted ? "Finalize Delivery" : drafts.length ? "Continue In-Progress Carton" : scannedCount || missingCount ? "Resume Scanner" : "Start Scanner";
  overviewScanButton.disabled = Boolean(completion);
  if (undelivered) { overviewScanButton.disabled = false; overviewScanButton.dataset.action = "reopen"; }
  unableDeliveryButton.hidden = Boolean(completion || undelivered);
  inProgressSection.hidden = !drafts.length;
  inProgressList.replaceChildren();
  drafts.forEach(draft => {
    const card = document.createElement("article"); card.className = "draft-card";
    const labels = requiredCartonPhotoLabels(draft.cartonType); const photoCount = labels.filter(label => draft.photos?.[label]).length;
    card.innerHTML = `<strong>${draft.cartonNumber} — ${draft.cartonType || "Type needed"}</strong><span>Photos: ${photoCount} of ${labels.length}${draft.attached?.length ? ` · Attached: ${draft.attached.length} of ${draft.extraExpected}` : ""}</span>`;
    const actions = document.createElement("div"); actions.className = "draft-card-actions";
    const resume = document.createElement("button"); resume.className = "primary-button"; resume.textContent = "Continue"; resume.addEventListener("click", () => showCartonWorkflow(draft));
    const discard = document.createElement("button"); discard.className = "secondary-button"; discard.textContent = "Discard"; discard.addEventListener("click", () => { activeCartonDraft = draft; discardActiveDraft(); });
    actions.append(resume, discard); card.append(actions); inProgressList.append(card);
  });
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
    const preview = document.createElement("img");
    const deleteButton = document.createElement("button");
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
    preview.className = "product-photo-preview";
    preview.alt = `${label} preview`;
    preview.hidden = true;
    deleteButton.type = "button";
    deleteButton.className = "delete-product-photo";
    deleteButton.setAttribute("aria-label", `Delete ${label} photo`);
    deleteButton.textContent = "×";
    deleteButton.hidden = true;
    libraryButton.addEventListener("click", event => {
      event.stopPropagation();
      libraryInput.click();
    });
    const saveProductPhoto = async input => {
      const file = input.files?.[0];
      if (!file) return;
      productPhotos.set(label, await imageFileToDataUrl(file));
      preview.src = await loadPhotoData(productPhotos.get(label));
      preview.hidden = false;
      deleteButton.hidden = false;
      wrapper.classList.add("complete");
      title.textContent = `✓ ${label}`;
      input.value = "";
    };
    cameraInput.addEventListener("change", () => saveProductPhoto(cameraInput));
    libraryInput.addEventListener("change", () => saveProductPhoto(libraryInput));
    deleteButton.addEventListener("click", event => {
      event.stopPropagation();
      productPhotos.delete(label);
      preview.src = "";
      preview.hidden = true;
      deleteButton.hidden = true;
      wrapper.classList.remove("complete");
      title.textContent = label;
    });
    cameraLabel.append(title, cameraInput);
    wrapper.append(preview, cameraLabel, libraryInput, libraryButton, deleteButton);
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
    loadPhotoData(src).then(data => { image.src = data; });
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
    image.onload = async () => {
      const maxEdge = 1600;
      const scale = Math.min(1, maxEdge / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.naturalWidth * scale);
      canvas.height = Math.round(image.naturalHeight * scale);
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(objectUrl);
      resolve(await storePhotoData(canvas.toDataURL("image/jpeg", 0.72)));
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
  const damageRecord = {
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
  };
  const existingGroup = getGroups()[cartonNumber];
  damageRecord.associatedCartons = existingGroup?.members || [cartonNumber];
  const alreadyCompleted = getKnownAcceptedCartons().has(cartonNumber);
  const selectedType = normalizedType(selectedDamageCarton.cartonType);
  if (!alreadyCompleted && selectedType === "Bundle" && !existingGroup) {
    const values = [...productPhotos.values()];
    activeCartonDraft = { id: createRecordId(), cartonNumber, dropId: activeDropId, cartonType: "Bundle", entryMethod: "Barcode", photos: { "First end": values[0], "First corner": values[1], "Opposite end": values[2], "Opposite corner": values[3] }, attached: [], pendingDamage: damageRecord, createdAt: new Date().toISOString() };
    saveActiveDraft(); damageFormPage.hidden = true; bundlePromptPage.hidden = false; return;
  }
  queueRecord(damageRecord);
  const affected = existingGroup?.members || [cartonNumber];
  affected.forEach(number => { rememberDamagedCarton(number); if (!getKnownAcceptedCartons().has(number)) { rememberAcceptedCarton(number); scannedCartons.add(number); } });
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
    identifyDamageCarton(barcode, "scanner");
    return;
  }

  if (attachedMode) {
    handleAttachedCartonScan(carton);
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

  stopManualPhotoCamera();
  manualEntryPage.hidden = true;
  beginCartonWorkflow(carton, "Manual", {
    explanation,
    tagStatus,
    tagEvidence: [...manualPhotos]
  });
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

  beginCartonWorkflow(carton, "Barcode");
  playBeep();

  if (navigator.vibrate) {
    navigator.vibrate(150);
  }

}

function hideV27Pages() {
  cartonWorkflowPage.hidden = true;
  bundlePromptPage.hidden = true;
  finalizePage.hidden = true;
  unableDeliveryPage.hidden = true;
}

function getDrafts() { return readStoredJson(DRAFTS_KEY, {}); }
function getGroups() { return readStoredJson(GROUPS_KEY, {}); }
function getMethods() { return readStoredJson(METHODS_KEY, {}); }
function getCompletions() { return readStoredJson(COMPLETIONS_KEY, {}); }
function getUndelivered() { return readStoredJson(UNDELIVERED_KEY, {}); }

function normalizedType(value) {
  const type = String(value || "").trim().toLowerCase();
  if (type === "bundle") return "Bundle";
  if (type === "stick") return "Stick";
  if (type === "skid" || type === "pallet") return "Skid";
  if (type === "box") return "Box";
  if (type === "flat") return "Flat";
  return "";
}

function requiredCartonPhotoLabels(type) {
  if (type === "Bundle") return ["First end", "First corner", "Opposite end", "Opposite corner"];
  if (type === "Stick" || type === "Skid") return ["First end", "Opposite end"];
  return type === "Box" || type === "Flat" ? ["Overall photo"] : [];
}

function beginCartonWorkflow(carton, entryMethod, manual = {}) {
  stopScanner();
  const cartonNumber = String(carton.cartonNumber).trim().toUpperCase();
  const drafts = getDrafts();
  activeCartonDraft = drafts[cartonNumber] || {
    id: createRecordId(), cartonNumber, dropId: activeDropId,
    cartonType: normalizedType(carton.cartonType), driverAssignedType: false,
    entryMethod, manual, photos: {}, attached: [], createdAt: new Date().toISOString()
  };
  drafts[cartonNumber] = activeCartonDraft;
  writeStoredJson(DRAFTS_KEY, drafts);
  showCartonWorkflow(activeCartonDraft);
}

function showCartonWorkflow(draft) {
  activeCartonDraft = draft;
  hideV27Pages();
  scannerPage.hidden = true; routePage.hidden = true; dropOverviewPage.hidden = true;
  cartonWorkflowPage.hidden = false;
  const carton = cartonLookup.get(draft.cartonNumber);
  cartonWorkflowTitle.textContent = draft.cartonNumber;
  cartonWorkflowDetails.textContent = `${draft.entryMethod === "Manual" ? "Manual entry · " : ""}${carton?.description || "No description available"}`;
  unknownTypePanel.hidden = Boolean(draft.cartonType);
  assignedCartonType.value = draft.cartonType || "";
  cartonWorkflowMessage.textContent = "";
  renderCartonPhotoFields();
  window.scrollTo(0, 0);
}

function renderCartonPhotoFields() {
  cartonPhotoFields.replaceChildren();
  const labels = requiredCartonPhotoLabels(activeCartonDraft?.cartonType);
  labels.forEach(label => cartonPhotoFields.append(createV27PhotoSlot(label, activeCartonDraft.photos[label] || "", data => {
    if (data) activeCartonDraft.photos[label] = data; else delete activeCartonDraft.photos[label];
    saveActiveDraft(); renderCartonPhotoFields();
  })));
}

function createV27PhotoSlot(label, value, onChange) {
  const wrapper = document.createElement("div"); wrapper.className = `damage-photo-slot${value ? " complete" : ""}`;
  const cameraLabel = document.createElement("label");
  const title = document.createElement("span"); title.textContent = label;
  const input = document.createElement("input"); input.type = "file"; input.accept = "image/*"; input.capture = "environment";
  const preview = document.createElement("img"); preview.className = "product-photo-preview"; preview.alt = label;
  if (value) { preview.hidden = false; loadPhotoData(value).then(data => { preview.src = data; }); } else preview.hidden = true;
  input.addEventListener("change", async () => { const file = input.files?.[0]; if (file) onChange(await compressPhoto(file)); });
  cameraLabel.append(title, preview, input);
  const library = document.createElement("button"); library.type = "button"; library.className = "photo-library-button"; library.textContent = "🖼️";
  const libraryInput = document.createElement("input"); libraryInput.type = "file"; libraryInput.accept = "image/*"; libraryInput.hidden = true;
  library.addEventListener("click", () => libraryInput.click());
  libraryInput.addEventListener("change", async () => { const file = libraryInput.files?.[0]; if (file) onChange(await compressPhoto(file)); });
  wrapper.append(cameraLabel, libraryInput, library);
  if (value) { const remove = document.createElement("button"); remove.type = "button"; remove.className = "delete-product-photo"; remove.textContent = "×"; remove.addEventListener("click", () => onChange("")); wrapper.append(remove); }
  return wrapper;
}

async function compressPhoto(file) {
  const source = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });
  const image = await new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = reject; img.src = source; });
  const max = 1280, scale = Math.min(1, max / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas"); canvas.width = Math.round(image.width * scale); canvas.height = Math.round(image.height * scale);
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
  return storePhotoData(canvas.toDataURL("image/jpeg", .68));
}

function saveActiveDraft() { const drafts = getDrafts(); drafts[activeCartonDraft.cartonNumber] = activeCartonDraft; writeStoredJson(DRAFTS_KEY, drafts); }

function continueCartonWorkflow() {
  if (!activeCartonDraft.cartonType) { cartonWorkflowMessage.textContent = "Select the carton type."; return; }
  const labels = requiredCartonPhotoLabels(activeCartonDraft.cartonType);
  if (labels.some(label => !activeCartonDraft.photos[label])) { cartonWorkflowMessage.textContent = "Take each required carton photo."; return; }
  if (activeCartonDraft.cartonType === "Bundle") { cartonWorkflowPage.hidden = true; bundlePromptPage.hidden = false; return; }
  completeCartonGroup();
}

function discardActiveDraft() {
  if (!activeCartonDraft || !confirm(`Discard unfinished work for ${activeCartonDraft.cartonNumber}?`)) return;
  const drafts = getDrafts(); delete drafts[activeCartonDraft.cartonNumber]; writeStoredJson(DRAFTS_KEY, drafts); activeCartonDraft = null; attachedMode = null; openDropOverview(activeDropId);
}

function chooseBundleExtra(extra) {
  if (!Number.isInteger(extra) || extra < 0 || extra > 50) { alert("Enter a valid number of additional cartons."); return; }
  activeCartonDraft.extraExpected = extra; activeCartonDraft.attached = []; saveActiveDraft();
  if (!extra) { completeCartonGroup(); return; }
  attachedMode = activeCartonDraft;
  bundlePromptPage.hidden = true; scannerPage.hidden = false; document.body.classList.remove("damage-mode");
  dropIdBox.textContent = `Carton 2 of ${extra + 1}`; statusBox.textContent = "Scan attached C-tag"; resultBox.textContent = activeCartonDraft.cartonNumber;
  startScanner();
}

function handleAttachedCartonScan(carton) {
  const number = String(carton.cartonNumber).trim().toUpperCase();
  if (number === attachedMode.cartonNumber) { statusBox.textContent = "Primary carton cannot be rescanned"; playDuplicateBeep(); return; }
  if (attachedMode.attached.includes(number)) { statusBox.textContent = `${number} already added`; playDuplicateBeep(); return; }
  if (getKnownAcceptedCartons().has(number)) { hardStop("ALREADY SCANNED", `${number} was completed separately.`); return; }
  attachedMode.attached.push(number); activeCartonDraft = attachedMode; saveActiveDraft(); playBeep();
  const total = attachedMode.extraExpected + 1, completed = attachedMode.attached.length + 1;
  resultBox.textContent = number;
  if (completed >= total) { stopScanner(); attachedMode = null; completeCartonGroup(); return; }
  dropIdBox.textContent = `Carton ${completed + 1} of ${total}`; statusBox.textContent = `Added ${number} — scan next attached C-tag`;
}

function completeCartonGroup() {
  const draft = activeCartonDraft;
  const groupId = draft.id;
  const members = [draft.cartonNumber, ...(draft.attached || [])];
  if (draft.pendingDamage) draft.pendingDamage.associatedCartons = members;
  const groups = getGroups(); members.forEach(number => { groups[number] = { groupId, members, photos: draft.photos, cartonType: draft.cartonType }; }); writeStoredJson(GROUPS_KEY, groups);
  const methods = getMethods();
  members.forEach((number, index) => {
    const method = index === 0 ? draft.entryMethod : "Barcode";
    methods[number] = method;
    if (index === 0 && draft.pendingDamage) queueRecord(draft.pendingDamage);
    else queueSuccessfulScan(number, { entryMethod: method, explanation: index === 0 ? draft.manual?.explanation : "", tagStatus: index === 0 ? draft.manual?.tagStatus : "", photoData: index === 0 ? draft.manual?.tagEvidence : "", productPhotos: draft.photos, bundleAssociationId: groupId, associatedCartons: members, cartonType: draft.cartonType, driverAssignedType: draft.driverAssignedType });
    rememberAcceptedCarton(number);
    if (draft.pendingDamage) rememberDamagedCarton(number);
    scannedCartons.add(number);
  });
  writeStoredJson(METHODS_KEY, methods);
  const drafts = getDrafts(); delete drafts[draft.cartonNumber]; writeStoredJson(DRAFTS_KEY, drafts);
  activeCartonDraft = null; attachedMode = null; renderRoutePage(); openScannerForDrop(activeDropId, true);
}

function renderScannerCartonList() {
  if (!scannerCartonList || !routeData) return;
  const methods = getMethods();
  const cartons = routeData.cartons.filter(c => c.dropId === activeDropId && scannedCartons.has(String(c.cartonNumber).toUpperCase()));
  scannerCartonList.replaceChildren();
  if (!cartons.length) { scannerCartonList.textContent = "None yet"; return; }
  cartons.forEach(carton => { const row = document.createElement("div"); const number = String(carton.cartonNumber).toUpperCase(); row.innerHTML = `<strong>${number}</strong><span>${normalizedType(carton.cartonType) || getGroups()[number]?.cartonType || "Carton"}${methods[number] === "Manual" ? " · Manual" : ""}</span>`; scannerCartonList.append(row); });
}

function finalizeDraftKey() { return `trackmaster-finalize-draft-${shippingEvent}-${activeDropId}`; }

function openFinalizeDelivery() {
  const cartons = routeData.cartons.filter(c => c.dropId === activeDropId);
  const accepted = getKnownAcceptedCartons(), missing = getMissingCartons();
  if (Object.values(getDrafts()).some(d => d.dropId === activeDropId) || cartons.some(c => { const n = String(c.cartonNumber).toUpperCase(); return !accepted.has(n) && !missing.has(n); })) { alert("Every carton must be accounted for before finalizing."); return; }
  hideV27Pages(); dropOverviewPage.hidden = true; finalizePage.hidden = false;
  finalizePhotos = readStoredJson(finalizeDraftKey(), []); renderFinalizePhotos(); window.scrollTo(0, 0);
  setTimeout(() => finalizeCameraInput.click(), 100);
}

async function addFinalizePhotos(event) {
  for (const file of [...(event.target.files || [])]) finalizePhotos.push(await compressPhoto(file));
  writeStoredJson(finalizeDraftKey(), finalizePhotos); event.target.value = ""; renderFinalizePhotos();
}

function renderFinalizePhotos() {
  finalizePhotoPreviews.replaceChildren();
  finalizePhotos.forEach((data, index) => { const box = document.createElement("div"); const img = document.createElement("img"); loadPhotoData(data).then(source => { img.src = source; }); const remove = document.createElement("button"); remove.type = "button"; remove.textContent = "×"; remove.addEventListener("click", () => { finalizePhotos.splice(index, 1); writeStoredJson(finalizeDraftKey(), finalizePhotos); renderFinalizePhotos(); }); box.append(img, remove); finalizePhotoPreviews.append(box); });
}

function completeDelivery() {
  if (!finalizePhotos.length) { finalizeMessage.textContent = "Add at least one overall delivery photo."; return; }
  const completions = getCompletions(); completions[activeDropId] = { completedAt: new Date().toISOString(), status: "pending", photos: finalizePhotos }; writeStoredJson(COMPLETIONS_KEY, completions);
  const driver = readStoredJson(DRIVER_SESSION_KEY, null);
  queueRecord({ action: "completeDelivery", shippingEvent, dropId: activeDropId, driverId: driver?.driverId || "", photos: finalizePhotos, ...getLocationMetadata() });
  localStorage.removeItem(finalizeDraftKey()); finalizePhotos = []; syncPendingRecords(); showRoutePage();
}

function openUnableDelivery() {
  hideV27Pages(); dropOverviewPage.hidden = true; unableDeliveryPage.hidden = false; unableDeliveryForm.reset(); unablePhotos = new Map(); customerSignature = ""; signaturePreview.hidden = true; unableMessage.textContent = ""; configureUnableDeliveryForm(); window.scrollTo(0, 0);
}

function configureUnableDeliveryForm() {
  const reason = unableReason.value;
  unableExplanationPanel.hidden = !["Inaccessible Jobsite", "Driver Returning to Yard", "Customer Rejected Entire Order"].includes(reason);
  unableExplanationPanel.querySelector("label").textContent = reason === "Customer Rejected Entire Order" ? "Reason for rejecting the order" : "Explanation";
  rejectionCustomerPanel.hidden = reason !== "Customer Rejected Entire Order";
  unablePhotoPanel.hidden = !["Business Closed", "Locked Gate"].includes(reason);
  const labels = reason === "Business Closed" ? ["Business front"] : reason === "Locked Gate" ? ["Gate", "Lock close-up"] : [];
  renderUnablePhotoSlots(labels);
}

function renderUnablePhotoSlots(labels) {
  unablePhotoFields.replaceChildren();
  labels.forEach(label => unablePhotoFields.append(createV27PhotoSlot(label, unablePhotos.get(label) || "", data => { if (data) unablePhotos.set(label, data); else unablePhotos.delete(label); renderUnablePhotoSlots(labels); })));
}

function meaningful(value, minimum) { return String(value || "").replace(/[^a-z0-9]/gi, "").length >= minimum; }

function submitUnableDelivery(event) {
  event.preventDefault(); unableMessage.textContent = "";
  const reason = unableReason.value;
  if (!reason) { unableMessage.textContent = "Select a reason."; return; }
  if (["Inaccessible Jobsite", "Driver Returning to Yard", "Customer Rejected Entire Order"].includes(reason) && !meaningful(unableExplanation.value, 10)) { unableMessage.textContent = reason === "Customer Rejected Entire Order" ? "Enter at least 10 meaningful characters explaining the rejection." : "Enter at least 10 meaningful characters."; return; }
  const requiredEvidence = reason === "Business Closed" ? ["Business front"] : reason === "Locked Gate" ? ["Gate", "Lock close-up"] : [];
  if (requiredEvidence.some(label => !unablePhotos.get(label))) { unableMessage.textContent = "Add each required evidence photo."; return; }
  let rejection = null;
  if (reason === "Customer Rejected Entire Order") {
    const firstName = document.getElementById("reject-first-name").value.trim(), lastName = document.getElementById("reject-last-name").value.trim(), company = document.getElementById("reject-company").value.trim(), phone = document.getElementById("reject-phone").value.trim(), email = document.getElementById("reject-email").value.trim(), leftAtSite = unableDeliveryForm.querySelector('[name="left-at-site"]:checked')?.value;
    if (!firstName || !meaningful(lastName, 3) || !company || phone.replace(/\D/g, "").length < 10 || !/^\S+@\S+\.\S+$/.test(email) || !leftAtSite || !customerSignature) { unableMessage.textContent = "Complete every customer field and collect a signature."; return; }
    const rejectionPhotoLabels = ["Overall view 1", "Overall view 2", "Overall view 3", "Overall view 4"];
    if (rejectionPhotoLabels.some(label => !unablePhotos.get(label))) { unablePhotoPanel.hidden = false; renderUnablePhotoSlots(rejectionPhotoLabels); unableMessage.textContent = "Add four overall photos of the rejected order, then complete again."; return; }
    rejection = { firstName, lastName, company, phone, email, leftAtSite, signature: customerSignature };
  }
  if (reason === "Driver Returning to Yard") { submitReturnToYard(); return; }
  saveUndeliveredDrops([activeDropId], reason, rejection);
}

function activeDropIds() {
  const completed = getCompletions(), undelivered = getUndelivered();
  return [...new Set(routeData.cartons.map(c => c.dropId))].filter(id => !completed[id] && !undelivered[id]);
}

function dropHasActivity(dropId) {
  const numbers = new Set(routeData.cartons.filter(c => c.dropId === dropId).map(c => String(c.cartonNumber).toUpperCase()));
  return Object.values(getDrafts()).some(d => d.dropId === dropId) || [...getKnownAcceptedCartons()].some(n => numbers.has(n)) || [...getDamagedCartons()].some(n => numbers.has(n));
}

function submitReturnToYard() {
  const affected = activeDropIds();
  const blocked = affected.filter(dropHasActivity);
  if (blocked.length) { unableMessage.textContent = "Returning to Yard is blocked because delivery work is in progress. Finish or discard the affected work first."; return; }
  if (!confirm(`This drop and all ${Math.max(affected.length - 1, 0)} remaining active drops will be marked not delivered. All cartons must remain on the truck. Are you sure?`)) { showRoutePage(); return; }
  saveUndeliveredDrops(affected, "Driver Returning to Yard", null);
}

function saveUndeliveredDrops(dropIds, reason, rejection) {
  const records = getUndelivered(); const driver = readStoredJson(DRIVER_SESSION_KEY, null);
  dropIds.forEach(dropId => { const leftAtSite = rejection?.leftAtSite === "Yes"; records[dropId] = { reason, status: leftAtSite ? "Customer Rejected · Left at Site · Pickup Required" : reason === "Customer Rejected Entire Order" ? "Customer Rejected · Remains on Truck" : `Not Delivered · ${reason}`, recordedAt: new Date().toISOString(), rejection, photos: Object.fromEntries(unablePhotos) }; queueRecord({ action: "dropNotDelivered", shippingEvent, dropId, reason, explanation: unableExplanation.value.trim(), rejection, photos: Object.fromEntries(unablePhotos), driverId: driver?.driverId || "", ...getLocationMetadata() }); });
  writeStoredJson(UNDELIVERED_KEY, records); syncPendingRecords(); showRoutePage();
}

function reopenUndeliveredDrop() {
  if (!confirm("Has the customer or site become available for delivery?")) return;
  const records = getUndelivered(); const previous = records[activeDropId]; delete records[activeDropId]; writeStoredJson(UNDELIVERED_KEY, records);
  queueRecord({ action: "reopenDelivery", shippingEvent, dropId: activeDropId, previousReason: previous?.reason || "" }); renderRoutePage(); openDropOverview(activeDropId);
}

let signatureDrawing = false, signatureHasInk = false;
function openSignatureDialog() { signatureDialog.hidden = false; requestAnimationFrame(() => { resizeSignatureCanvas(); clearSignature(); }); }
function resizeSignatureCanvas() { const width = signatureCanvas.clientWidth, height = signatureCanvas.clientHeight; signatureCanvas.width = Math.max(600, Math.round(width * devicePixelRatio)); signatureCanvas.height = Math.max(250, Math.round(height * devicePixelRatio)); const ctx = signatureCanvas.getContext("2d"); ctx.scale(devicePixelRatio, devicePixelRatio); ctx.lineWidth = 3; ctx.lineCap = "round"; }
function signaturePoint(event) { return { x: Number(event.offsetX), y: Number(event.offsetY) }; }
function startSignature(event) { event.preventDefault(); signatureDrawing = true; const p = signaturePoint(event), ctx = signatureCanvas.getContext("2d"); ctx.beginPath(); ctx.moveTo(p.x, p.y); }
function moveSignature(event) { if (!signatureDrawing) return; event.preventDefault(); const p = signaturePoint(event), ctx = signatureCanvas.getContext("2d"); ctx.lineTo(p.x, p.y); ctx.stroke(); signatureHasInk = true; document.getElementById("accept-signature").disabled = false; }
function endSignature() { signatureDrawing = false; }
function clearSignature() { const ctx = signatureCanvas.getContext("2d"); ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height); signatureHasInk = false; document.getElementById("accept-signature").disabled = true; }
function acceptSignature() {
  if (!signatureHasInk) return;
  const output = document.createElement("canvas");
  output.width = signatureCanvas.width;
  output.height = signatureCanvas.height;
  const context = output.getContext("2d");
  context.fillStyle = "white"; context.fillRect(0, 0, output.width, output.height);
  context.drawImage(signatureCanvas, 0, 0);
  customerSignature = output.toDataURL("image/png");
  signaturePreview.src = customerSignature; signaturePreview.hidden = false; signatureDialog.hidden = true; document.getElementById("open-signature-button").textContent = "Replace Signature";
}
signatureCanvas.addEventListener("pointerdown", startSignature); signatureCanvas.addEventListener("pointermove", moveSignature); signatureCanvas.addEventListener("pointerup", endSignature); signatureCanvas.addEventListener("pointercancel", endSignature);

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
