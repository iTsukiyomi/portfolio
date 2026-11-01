import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

// Register GSAP plugins globally once
gsap.registerPlugin(ScrollTrigger, Draggable, Flip, SplitText);

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

/**
 * Initializes a single, synchronized animation loop combining Lenis and GSAP.
 * Disabled completely when prefers-reduced-motion is active.
 */
export function initSmoothScroll(): () => void {
  // If reduced motion is requested, do not run Lenis
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    return () => {};
  }

  // Destroy any existing instance
  if (lenisInstance) {
    destroySmoothScroll();
  }

  const lenis = new Lenis({
    autoRaf: false, // Mandatory: GSAP ticker drives raf exclusively
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenisInstance = lenis;

  // Sync Lenis scroll updates with ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // GSAP ticker drives Lenis at exact RAF ticks
  tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);

  // Disable lag smoothing to prevent fighting between GSAP and Lenis
  gsap.ticker.lagSmoothing(0);

  return destroySmoothScroll;
}

export function destroySmoothScroll(): void {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export { gsap, ScrollTrigger, Draggable, Flip, SplitText };
