'use client';

import { useEffect, useRef } from 'react';

export default function ScrollTilt({ children, className = '' }) {
  const ref = useRef(null);
  const lastScroll = useRef(0);
  const raf = useRef(null);
  const currentTilt = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScroll.current;
      lastScroll.current = scrollY;

      /* clamp tilt between -12 and 12 degrees based on scroll speed */
      const target = Math.max(-12, Math.min(12, delta * 0.8));
      currentTilt.current = target;
      el.style.transform = `rotate(${target}deg)`;

      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(ease);
    };

    const ease = () => {
      currentTilt.current *= 0.92;
      if (Math.abs(currentTilt.current) < 0.1) {
        currentTilt.current = 0;
        el.style.transform = 'rotate(0deg)';
        return;
      }
      el.style.transform = `rotate(${currentTilt.current}deg)`;
      raf.current = requestAnimationFrame(ease);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform', transition: 'transform 0.1s ease-out' }}>
      {children}
    </div>
  );
}