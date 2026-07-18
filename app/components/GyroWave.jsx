"use client";

import { useEffect, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";

// Shared across all instances — request permission only once
let gyroPermission = "pending"; // "pending" | "granted" | "denied"
let gyroListeners = [];

function notifyListeners(e) {
  for (const fn of gyroListeners) fn(e);
}

function addGyroListener(fn) {
  gyroListeners.push(fn);
  if (gyroListeners.length === 1) {
    startGlobalGyro();
  }
  return () => {
    gyroListeners = gyroListeners.filter((f) => f !== fn);
    if (gyroListeners.length === 0) {
      window.removeEventListener("deviceorientation", notifyListeners);
    }
  };
}

function startGlobalGyro() {
  if (gyroPermission === "granted") {
    window.addEventListener("deviceorientation", notifyListeners);
    return;
  }

  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    if (gyroPermission === "pending") {
      gyroPermission = "denied"; // prevent re-entry
      DeviceOrientationEvent.requestPermission()
        .then((state) => {
          if (state === "granted") {
            gyroPermission = "granted";
            window.addEventListener("deviceorientation", notifyListeners);
          } else {
            waitForTouch();
          }
        })
        .catch(() => {
          waitForTouch();
        });
    }
  } else {
    gyroPermission = "granted";
    window.addEventListener("deviceorientation", notifyListeners);
  }
}

function waitForTouch() {
  document.addEventListener(
    "touchstart",
    function onTouch() {
      DeviceOrientationEvent.requestPermission()
        .then((s) => {
          if (s === "granted") {
            gyroPermission = "granted";
            window.addEventListener("deviceorientation", notifyListeners);
          }
        })
        .catch(console.error);
    },
    { once: true },
  );
}

export default function GyroWave({ children, className }) {
  const containerRef = useRef(null);
  const pathname = usePathname();
  const statesRef = useRef(null);

  const text = typeof children === "string" ? children : "";

  const { chars, totalVisible } = useMemo(() => {
    const result = [];
    let count = 0;
    for (const ch of text) {
      if (ch === "\n") {
        result.push({ char: "\n", index: -1 });
      } else {
        result.push({ char: ch, index: count });
        count++;
      }
    }
    return { chars: result, totalVisible: count };
  }, [text]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Per-character spring state
    if (!statesRef.current || statesRef.current.length !== totalVisible) {
      statesRef.current = Array.from({ length: totalVisible }, () => ({
        y: 0,
        vy: 0,
      }));
    }
    const states = statesRef.current;

    let baseBeta = null;
    let baseGamma = null;
    let lastBurst = 0;
    let rafId = null;
    let active = false;
    let pendingTimeouts = [];

    function handleOrientation(e) {
      if (e.beta === null && e.gamma === null) return;

      const beta = e.beta || 0;
      const gamma = e.gamma || 0;

      if (baseBeta === null) {
        baseBeta = beta;
        baseGamma = gamma;
        return;
      }

      const deltaGamma = gamma - baseGamma;
      const movement = Math.abs(deltaGamma) + Math.abs(beta - baseBeta);
      const now = Date.now();

      if (movement > 25 && now - lastBurst > 600) {
        lastBurst = now;
        baseBeta = beta;
        baseGamma = gamma;

        const tiltLeft = deltaGamma < 0;

        // Stagger impulses across characters — add energy, never reset
        for (let i = 0; i < totalVisible; i++) {
          const base = tiltLeft
            ? (totalVisible - 1 - i) * 70
            : i * 70;
          const jitter = (Math.random() - 0.5) * 60;
          const delay = Math.max(0, base + jitter);

          const tid = setTimeout(() => {
            const impulse = -(3.5 + Math.random() * 3);
            states[i].vy += impulse;
          }, delay);
          pendingTimeouts.push(tid);
        }

        if (!active) {
          active = true;
          rafId = requestAnimationFrame(animate);
        }
      }

      baseBeta += (beta - baseBeta) * 0.01;
      baseGamma += (gamma - baseGamma) * 0.01;
    }

    function animate() {
      const charEls = el.querySelectorAll(".gyro-wave__char");
      let anyMoving = false;

      for (let i = 0; i < states.length; i++) {
        const s = states[i];

        s.vy += (0 - s.y) * 0.015;
        s.vy *= 0.965;
        s.y += s.vy;

        if (Math.abs(s.y) < 0.1 && Math.abs(s.vy) < 0.1) {
          s.y = 0;
          s.vy = 0;
        } else {
          anyMoving = true;
        }

        if (charEls[i]) {
          charEls[i].style.transform =
            s.y === 0 ? "" : `translateY(${s.y.toFixed(1)}px)`;
        }
      }

      if (anyMoving) {
        rafId = requestAnimationFrame(animate);
      } else {
        active = false;
      }
    }

    const removeListener = addGyroListener(handleOrientation);

    return () => {
      removeListener();
      cancelAnimationFrame(rafId);
      pendingTimeouts.forEach(clearTimeout);
      const charEls = el.querySelectorAll(".gyro-wave__char");
      charEls.forEach((c) => {
        c.style.transform = "";
      });
    };
  }, [pathname, totalVisible]);

  return (
    <span
      ref={containerRef}
      className={`${className || ""} gyro-wave`}
    >
      {chars.map((c, i) => {
        if (c.char === "\n") return <br key={i} />;
        return (
          <span
            key={i}
            className="gyro-wave__char"
            data-i={c.index}
          >
            {c.char === " " ? "\u00A0" : c.char}
          </span>
        );
      })}
    </span>
  );
}