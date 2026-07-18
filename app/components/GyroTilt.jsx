"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { addGyroListener } from "./gyro";

export default function GyroTilt({ children, className, intensity = 5 }) {
  const ref = useRef(null);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  /* ---- DESKTOP: scroll-driven tilt ---- */
  useEffect(() => {
    if (window.innerWidth <= 767) return;

    const el = ref.current;
    if (!el) return;

    let lastScrollY = window.scrollY;
    let currentTilt = 0;
    let targetTilt = 0;
    let currentY = 0;
    let targetY = 0;
    let rafId = null;
    let bobTime = Math.random() * 1000;

    function onScroll() {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;

      // Scroll down → tilt left (negative), scroll up → tilt right (positive)
      targetTilt += delta * -0.35;
      targetTilt = Math.max(-14, Math.min(14, targetTilt));

      // Slight vertical nudge in scroll direction
      targetY += delta * 0.08;
      targetY = Math.max(-6, Math.min(6, targetY));
    }

    function animate() {
      // Ease tilt back toward zero
      targetTilt *= 0.97;
      targetY *= 0.97;

      // Soft spring
      currentTilt += (targetTilt - currentTilt) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      // Gentle idle bob
      bobTime += 0.012;
      const bobY = Math.sin(bobTime) * 1;

      el.style.transform = `
        translateY(${(currentY + bobY).toFixed(1)}px)
        rotate(${currentTilt.toFixed(2)}deg)
      `;

      rafId = requestAnimationFrame(animate);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      if (el) el.style.transform = "";
    };
  }, [pathname]);

  /* ---- MOBILE: gyro-driven movement ---- */
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
          targetX += -(intensity * (0.9 + Math.random() * 1));
          targetY += rotSign > 0
            ? -(intensity * (2.5 + Math.random() * 2))
            : intensity * (1 + Math.random() * 1.2);
          targetRotation += -(rotAmount);
        } else {
          targetX += intensity * (2.9 + Math.random() * 1);
          targetY += rotSign > 0
            ? -(intensity * (3.5 + Math.random() * 2))
            : intensity * (1 + Math.random() * 1.2);
          targetRotation += rotAmount;
        }
      }

      baseBeta += (beta - baseBeta) * 0.01;
      baseGamma += (gamma - baseGamma) * 0.01;
    }

    function animate() {
      targetX *= 0.996;
      targetY *= 0.996;
      targetRotation *= 0.996;

      velocityX += (targetX - currentX) * 0.003;
      velocityY += (targetY - currentY) * 0.003;
      velocityX *= 0.885;
      velocityY *= 0.985;
      currentX += velocityX;
      currentY += velocityY;

      rotationVelocity += (targetRotation - currentRotation) * 0.003;
      rotationVelocity *= 0.985;
      currentRotation += rotationVelocity;

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