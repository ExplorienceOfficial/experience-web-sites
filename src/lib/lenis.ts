import type Lenis from 'lenis';

/** Shared handle so UI (navbar, buttons) can drive the smooth scroller. */
export const lenisRef: { current: Lenis | null } = { current: null };

// easeInOutCubic — a slow, graceful glide.
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function scrollToId(id: string, duration = 2.2) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisRef.current) {
    lenisRef.current.scrollTo(el, { offset: 0, duration, easing: easeInOutCubic });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
