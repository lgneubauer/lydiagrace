"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { addGyroListener } from "./gyro";

export default function GyroTilt({ children, className, intensity = 5 }) {
  const ref = useRef(null);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 767) return;
    setIsMobile(true);

    const el = ref.current;
    if (!el) return;

    let currentX = 0;
    let currentY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let targetX = 0;
    let targetY = 0;

    let currentRotation = 0;
    let targetRotation = 0;
    let rotationVelocity = 0;

    let bobTime = Math.random() * 1000;
    let rafId = null;
    let hasOrientation = false;

    let baseBeta = null;
    let baseGamma = null;
    let lastBurst = 0;

    function handleOrientation(e) {
      if (e.beta === null && e.gamma === null) return;
      hasOrientation = true;

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

      if (movement > 25 && now - lastBurst > 200) {
        lastBurst = now;
        baseBeta = beta;
        baseGamma = gamma;

        const tiltLeft = deltaGamma < 0;
        const rotSign = Math.random() > 0.5 ? 1 : -1;
        const rotAmount = 8 + Math.random() * 12;

        if (tiltLeft) {
          // Drift left, rotate toward bottom-left or top-left
          targetX += -(intensity * (0.9 + Math.random() * 1));
          targetY += rotSign > 0
            ? -(intensity * (2.5 + Math.random() * 2))      // top-left
            : intensity * (1 + Math.random() * 1.2);         // bottom-left
          targetRotation += -(rotAmount);
        } else {
          // Drift right, rotate toward top-right or bottom-right
          targetX += intensity * (2.9 + Math.random() * 1);
          targetY += rotSign > 0
            ? -(intensity * (3.5 + Math.random() * 2))      // top-right
            : intensity * (1 + Math.random() * 1.2);         // bottom-right
          targetRotation += rotAmount;
        }
      }

      baseBeta += (beta - baseBeta) * 0.01;
      baseGamma += (gamma - baseGamma) * 0.01;
    }

    function animate() {
      // Slow drift back to center
      targetX *= 0.996;
      targetY *= 0.996;
      targetRotation *= 0.996;

      // Soft position spring
      velocityX += (targetX - currentX) * 0.003;
      velocityY += (targetY - currentY) * 0.003;
      velocityX *= 0.885;
      velocityY *= 0.985;
      currentX += velocityX;
      currentY += velocityY;

      // Soft rotation spring
      rotationVelocity += (targetRotation - currentRotation) * 0.003;
      rotationVelocity *= 0.985;
      currentRotation += rotationVelocity;

      // Clean sine float
      bobTime += 0.01;
      const bobY = Math.sin(bobTime) * 8.5;
      const bobX = Math.sin(bobTime * 0.5) * 1;

      if (el && hasOrientation) {
        el.style.transform = `
          translate3d(${(currentX + bobX).toFixed(1)}px, ${(currentY + bobY).toFixed(1)}px, 0)
          rotate(${currentRotation.toFixed(1)}deg)
        `;
      }

      rafId = requestAnimationFrame(animate);
    }

    const removeListener = addGyroListener(handleOrientation);
    rafId = requestAnimationFrame(animate);

    return () => {
      removeListener();
      cancelAnimationFrame(rafId);
      if (el) el.style.transform = "";
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