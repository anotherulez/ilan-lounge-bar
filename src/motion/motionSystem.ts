import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MOTION_TOKENS = {
  duration: {
    micro: 0.18,
    ui: 0.36,
    reveal: 0.75,
    cinematic: 1.1,
  },
  ease: {
    ui: 'power3.out',
    reveal: 'power3.out',
    cinematic: 'power2.inOut',
    scrub: 'none',
  },
  stagger: 0.08,
  revealDistance: 24,
  scrub: 0.8,
} as const;

export const BREAKPOINTS = {
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  tabletUp: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
} as const;

export function createMatchMediaContext(
  scope: HTMLElement,
  register: (mm: gsap.MatchMedia) => void
) {
  const mm = gsap.matchMedia(scope);
  register(mm);
  return () => mm.revert();
}

export { gsap, ScrollTrigger };
