"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function GyroTilt({ children, className, intensity = 12 }) {
  const ref = useRef(null);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only activate on small screens (phones)
    if (window.innerWidth > 767) return;

    let tiltX = 0;
    let tiltY = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let rafId = null;
    let hasOrientation = false;
    let lastBurst = 0;

    function handleOrientation(e) {
      if (e.beta === null && e.gamma === null) return;
      hasOrientation = true;
      setIsMobile(true);

      const beta = e.beta || 0;
      const gamma = e.gamma || 0;
      const movement = Math.abs(gamma) + Math.abs(beta - 30);
      const now = Date.now();

      // Burst when phone moves enough, throttled
      if (movement > 15 && now - lastBurst > 400) {
        lastBurst = now;
        const angle = Math.random() * Math.PI * 2;
        const dist = intensity * (0.5 + Math.random() * 0.8);
        targetX = Math.cos(angle) * dist;
        targetY = Math.sin(angle) * dist;
      }
    }

    function animate() {
      // Ease toward target then drift back to center
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      // Slowly pull target back to zero
      targetX *= 0.97;
      targetY *= 0.97;

      if (el && hasOrientation) {
        const rotate = currentX * 0.4;
        el.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`;
      }

      rafId = requestAnimationFrame(animate);
    }

    // Request permission on iOS 13+
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      function requestOnTouch() {
        DeviceOrientationEvent.requestPermission()
          .then((state) => {
            if (state === "granted") {
              window.addEventListener("deviceorientation", handleOrientation);
            }
          })
          .catch(console.error);
        document.removeEventListener("touchstart", requestOnTouch);
      }
      document.addEventListener("touchstart", requestOnTouch, { once: true });
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      cancelAnimationFrame(rafId);
      if (el) el.style.transform = "";
    };
  }, [pathname, intensity]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: isMobile ? "transform" : "auto" }}
    >
      {children}
    </div>
  );
}
