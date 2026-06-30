"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SparkleTrail() {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const rafRef = useRef(null);
  const lastSpawnRef = useRef(0);
  const imgRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") return;
    if (window.matchMedia("(pointer: fine)").matches === false) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Preload the star image
    const img = new Image();
    img.src = "/astro-reading.png";
    imgRef.current = img;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function handleMouseMove(e) {
      const now = Date.now();
      if (now - lastSpawnRef.current > 50) {
        lastSpawnRef.current = now;

        // Close sparkle — offset so it's near but not on the cursor
        sparksRef.current.push({
          x:
            e.clientX +
            (Math.random() - 0.5) * 40 +
            (Math.random() < 0.5 ? 15 : -15),
          y:
            e.clientY +
            (Math.random() - 0.5) * 40 +
            (Math.random() < 0.5 ? 15 : -15),
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 + 0.2,
          size: Math.random() * 12 + 6,
          opacity: 0.8,
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.04,
          decay: 0.01,
        });

        // Far sparkle — less frequent, drifts further
        if (Math.random() < 0.4) {
          sparksRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 120,
            y: e.clientY + (Math.random() - 0.5) * 120,
            vx: (Math.random() - 0.5) * 3.5,
            vy: (Math.random() - 0.5) * 3.5,
            size: Math.random() * 8 + 4,
            opacity: 0.55,
            rotation: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.03,
            decay: 0.005,
          });
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const star = imgRef.current;
      if (!star || !star.complete) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const sparks = sparksRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= s.decay;
        s.rotation += s.spin;
        s.size *= 0.993;
        s.vx *= 0.99;
        s.vy *= 0.99;

        if (s.opacity <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.opacity;
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.drawImage(star, -s.size / 2, -s.size / 2, s.size, s.size);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    document.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
