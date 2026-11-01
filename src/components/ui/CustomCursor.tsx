import React, { useEffect, useRef } from 'react';
import { gsap } from '../../lib/motion';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on fine pointer (mouse), not touch or reduced motion
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || isReduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Use gsap.quickTo for high-performance compositor updates without React renders
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });

    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power3.out' });

    const onPointerMove = (e: PointerEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      // Magnetic pull when hovering over interactive controls
      const target = (e.target as HTMLElement)?.closest(
        '.dock-item-btn, .win-control-btn, .desktop-icon-btn, .theme-switcher-btn'
      ) as HTMLElement | null;

      if (target) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // 0.3 strength magnetic pull
        targetX += (centerX - targetX) * 0.3;
        targetY += (centerY - targetY) * 0.3;
        ring.classList.add('hovering');
      } else {
        ring.classList.remove('hovering');
      }

      setDotX(targetX);
      setDotY(targetY);
      setRingX(targetX);
      setRingY(targetY);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="os-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="os-cursor-crosshair" aria-hidden="true" />
    </>
  );
};
