"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function GyroTilt({ children, className, intensity = 5 }) {
  const ref = useRef(null);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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
    let baseBeta = null;
    let baseGamma = null;

    let currentRotation = 0;
    let targetRotation = 0;
    let rotationVelocity = 0;

    let bobTime = Math.random() * 1000;

    function handleOrientation(e) {
      if (e.beta === null && e.gamma === null) return;

      hasOrientation = true;
      setIsMobile(true);

      const beta = e.beta || 0;
      const gamma = e.gamma || 0;

      if (baseBeta === null) {
        baseBeta = beta;
        baseGamma = gamma;
        return;
      }

      const deltaGamma = gamma - baseGamma;
      const deltaBeta = beta - baseBeta;
      const movement = Math.abs(deltaGamma) + Math.abs(deltaBeta);
      const now = Date.now();

      if (movement > 25 && now - lastBurst > 600) {
        lastBurst = now;

        baseBeta = beta;
        baseGamma = gamma;

        const tiltDir = Math.sign(deltaGamma) || 1;
        const tiltingLeft = tiltDir < 0;

        if (tiltingLeft) {
          // All float far left — mostly horizontal, tiny vertical variance
          const dist = intensity * (4 + Math.random() * 4);
          const verticalDrift = (Math.random() - 0.5) * intensity * 0.3;
          targetX = -dist;
          targetY = verticalDrift;

          const rotDir = Math.random() > 0.5 ? 1 : -1;
          targetRotation = currentRotation + rotDir * (30 + Math.random() * 70);
        } else {
          // Right tilt — float slightly right, less rotation
          const spread = (Math.random() - 0.5) * (Math.PI / 2);
          const angle = 0 + spread;
          const dist = intensity * (0.15 + Math.random() * 0.4);
          targetX = Math.cos(angle) * dist;
          targetY = Math.sin(angle) * dist;

          const rotDir = Math.random() > 0.5 ? 1 : -1;
          targetRotation = currentRotation + rotDir * (2 + Math.random() * 8);
        }
      }

      baseBeta += (beta - baseBeta) * 0.01;
      baseGamma += (gamma - baseGamma) * 0.01;
    }

    function animate() {
      // Slow drift back
      targetX *= 0.997;
      targetY *= 0.998;

      // Soft position spring
      velocityX += (targetX - currentX) * 0.008;
      velocityY += (targetY - currentY) * 0.008;
      velocityX *= 0.96;
      velocityY *= 0.96;
      currentX += velocityX;
      currentY += velocityY;

      // Soft rotation spring
      targetRotation *= 0.998;
      rotationVelocity += (targetRotation - currentRotation) * 0.006;
      rotationVelocity *= 0.96;
      currentRotation += rotationVelocity;

      // Gentle ambient bob
      bobTime += 0.008;
      const bobBase = Math.sin(bobTime) * 3 + Math.sin(bobTime * 1.3) * 2;
      const bobStrength = 0.6;
      const bobY = bobBase * bobStrength;
      const bobX = Math.sin(bobTime * 0.5) * 1.5 * bobStrength;

      if (el && hasOrientation) {
        el.style.transform = `
          translate3d(${currentX + bobX}px, ${currentY + bobY}px, 0)
          rotate(${currentRotation}deg)
        `;
      }

      rafId = requestAnimationFrame(animate);
    }

    function startListening() {
      window.addEventListener("deviceorientation", handleOrientation);
      rafId = requestAnimationFrame(animate);
    }

    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission()
        .then((state) => {
          if (state === "granted") {
            startListening();
          } else {
            document.addEventListener(
              "touchstart",
              function requestOnTouch() {
                DeviceOrientationEvent.requestPermission()
                  .then((s) => {
                    if (s === "granted") startListening();
                  })
                  .catch(console.error);
              },
              { once: true },
            );
          }
        })
        .catch(() => {
          document.addEventListener(
            "touchstart",
            function requestOnTouch() {
              DeviceOrientationEvent.requestPermission()
                .then((s) => {
                  if (s === "granted") startListening();
                })
                .catch(console.error);
            },
            { once: true },
          );
        });
    } else {
      startListening();
    }

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
      }}
    >
      {children}
    </div>
  );
}
