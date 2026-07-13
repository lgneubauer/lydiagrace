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
    let baseBeta = null;
    let baseGamma = null;

    // Rotation tracking
    let currentRotation = 0;
    let targetRotation = 0;
    let rotationVelocity = 0;
    let spinOrigin = 0;
    let spinDirection = 1;
    let isSpinning = false;

    // Ambient vertical bob
    let bobTime = Math.random() * 1000;

    function getSpinProgress() {
      if (!isSpinning) return 0;
      const totalSpin = targetRotation - spinOrigin;
      if (totalSpin === 0) return 0;
      const progress = (currentRotation - spinOrigin) / totalSpin;
      return Math.max(0, Math.min(1, progress));
    }

    function handleOrientation(e) {
      if (e.beta === null && e.gamma === null) return;

      hasOrientation = true;
      setIsMobile(true);

      const beta = e.beta || 0;
      const gamma = e.gamma || 0;

      // Set baseline on first reading
      if (baseBeta === null) {
        baseBeta = beta;
        baseGamma = gamma;
        return;
      }

      // Measure change from baseline
      const deltaGamma = gamma - baseGamma;
      const deltaBeta = beta - baseBeta;
      const movement = Math.abs(deltaGamma) + Math.abs(deltaBeta);
      const now = Date.now();

      // Only burst on real intentional tilts
      if (movement > 25 && now - lastBurst > 600) {
        lastBurst = now;

        // Update baseline after burst
        baseBeta = beta;
        baseGamma = gamma;

        const angle = Math.random() * Math.PI * 1;
        const horizontalDist = intensity * (-0.2 + Math.random() * 1.2);
        const verticalDist = intensity * (-1 + Math.random() * 0.1);

        targetX = Math.cos(angle) * horizontalDist;
        targetY = Math.sin(angle) * verticalDist;

        // Tilt direction from phone movement
        const tiltDirection = Math.abs(deltaGamma) > Math.abs(deltaBeta)
          ? Math.sign(deltaGamma)
          : Math.sign(deltaBeta);

        const progress = getSpinProgress();

        if (isSpinning && progress > 0.5) {
          // Past halfway — reverse: finish the circle the short way
          const remaining = targetRotation - currentRotation;
          const reverseAmount = (360 - Math.abs(remaining)) * -Math.sign(remaining);
          spinOrigin = currentRotation;
          targetRotation = currentRotation + reverseAmount;
          spinDirection = -spinDirection;
          rotationVelocity *= 0.1;
        } else {
          // Normal spin — full 360 in tilt direction
          spinOrigin = currentRotation;
          spinDirection = tiltDirection;
          targetRotation = currentRotation + tiltDirection * 360;
          isSpinning = true;
        }
      }

      // Slowly drift baseline toward current position
      baseBeta += (beta - baseBeta) * 0.01;
      baseGamma += (gamma - baseGamma) * 0.01;
    }

    function animate() {
      // Slowly return position to center
      targetX *= 0.975;
      targetY *= 0.985;

      // Spring force toward target position
      velocityX += (targetX - currentX) * 0.025;
      velocityY += (targetY - currentY) * 0.025;

      // Inertia damping for position
      velocityX *= 0.88;
      velocityY *= 0.88;

      currentX += velocityX;
      currentY += velocityY;

      // Rotation spring — slow down around halfway
      const progress = getSpinProgress();
      const halfwayProximity = 1 - Math.abs(progress - 0.5) * 2; // peaks at 0.5
      const stiffness = 0.0008 * (1 - halfwayProximity * 0.6); // softer near halfway
      const damping = 0.92 + halfwayProximity * 0.04; // more damping near halfway

      rotationVelocity += (targetRotation - currentRotation) * stiffness;
      rotationVelocity *= damping;
      currentRotation += rotationVelocity;

      // Mark spin as done when close enough
      if (isSpinning && Math.abs(targetRotation - currentRotation) < 0.5 && Math.abs(rotationVelocity) < 0.1) {
        isSpinning = false;
      }

      // Gentle ambient bob — always active, a bit stronger while spinning
      bobTime += 0.018;
      const bobBase = Math.sin(bobTime) * 3 + Math.sin(bobTime * 1.7) * 2;
      const bobStrength = isSpinning ? 1.4 : 0.8;
      const bobY = bobBase * bobStrength;
      const bobX = Math.sin(bobTime * 0.7) * 1.5 * bobStrength;

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

    // iOS 13+ requires permission from a user gesture
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