// Shared gyro permission — request once, all components subscribe

let gyroPermission = "unknown"; // "unknown" | "requesting" | "granted"
let gyroListeners = [];
let gestureListenerAttached = false;

function notifyListeners(e) {
  for (const fn of gyroListeners) fn(e);
}

export function addGyroListener(fn) {
  gyroListeners.push(fn);

  if (gyroPermission === "granted") {
    // Already good — make sure event listener is on
    ensureDeviceListener();
  } else if (gyroPermission === "unknown") {
    tryPermission();
  }

  return () => {
    gyroListeners = gyroListeners.filter((f) => f !== fn);
    if (gyroListeners.length === 0) {
      window.removeEventListener("deviceorientation", notifyListeners);
    }
  };
}

function ensureDeviceListener() {
  // Safe to call multiple times — browser deduplicates
  window.addEventListener("deviceorientation", notifyListeners);
}

function tryPermission() {
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    // iOS — needs user gesture. Try now (might work if already in a gesture),
    // and also attach gesture listeners as fallback
    if (gyroPermission !== "requesting") {
      gyroPermission = "requesting";

      DeviceOrientationEvent.requestPermission()
        .then((state) => {
          if (state === "granted") {
            onGranted();
          } else {
            // Failed without gesture — wait for one
            attachGestureListeners();
          }
        })
        .catch(() => {
          attachGestureListeners();
        });
    }
  } else {
    // Non-iOS — no permission needed
    onGranted();
  }
}

function onGranted() {
  gyroPermission = "granted";
  removeGestureListeners();
  ensureDeviceListener();
}

function handleGesture() {
  if (gyroPermission === "granted") return;

  DeviceOrientationEvent.requestPermission()
    .then((state) => {
      if (state === "granted") {
        onGranted();
      }
      // If denied, listeners stay attached — try again on next gesture
    })
    .catch(() => {
      // Keep listeners — try again on next tap
    });
}

function attachGestureListeners() {
  if (gestureListenerAttached) return;
  gestureListenerAttached = true;

  document.addEventListener("touchstart", handleGesture, { passive: true });
  document.addEventListener("click", handleGesture);
}

function removeGestureListeners() {
  if (!gestureListenerAttached) return;
  gestureListenerAttached = false;

  document.removeEventListener("touchstart", handleGesture);
  document.removeEventListener("click", handleGesture);
}