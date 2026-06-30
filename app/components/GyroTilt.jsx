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

    // Only activate on small screens
    if (window.innerWidth > 767) return;

    let currentX = 0;
    let currentY = 0;

    let velocityX = 0;
    let velocityY = 0;

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

      // Trigger movement burst
      if (movement > 15 && now - lastBurst > 450) {
        lastBurst = now;

        const angle = Math.random() * Math.PI * 2;

        // More vertical range
        const horizontalDist = intensity * (-20 + Math.random() * 1.2);

        const verticalDist = intensity * (-6 + Math.random() * 2);

        targetX = Math.cos(angle) * horizontalDist;
        targetY = Math.sin(angle) * verticalDist;
      }
    }

    function animate() {
      // Slowly return to center
      targetX *= 0.975;
      targetY *= 0.985;

      // Spring force toward target
      velocityX += (targetX - currentX) * 0.035;
      velocityY += (targetY - currentY) * 0.035;

      // Inertia damping
      velocityX *= 0.9;
      velocityY *= 0.9;

      currentX += velocityX;
      currentY += velocityY;

      if (el && hasOrientation) {
        const rotateZ = currentX * 0.8;
        const rotateX = -currentY * 0.6;
        const rotateY = currentX * 0.35;

        el.style.transform = `
          translate3d(${currentX}px, ${currentY}px, 0)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          rotateZ(${rotateZ}deg)
        `;
      }

      rafId = requestAnimationFrame(animate);
    }

    // iOS permission handling
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

      if (el) {
        el.style.transform = "";
      }
    };
  }, [pathname, intensity]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        willChange: isMobile ? "transform" : "auto",
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {children}
    </div>
  );
}
