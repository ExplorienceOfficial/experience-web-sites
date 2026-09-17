'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useExperience } from '@/lib/store';
import { lenisRef } from '@/lib/lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const setScroll = useExperience((s) => s.setScroll);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // autoRaf lets Lenis run its own render loop — robust against React Strict
    // Mode's double-mount (a manual rAF loop can end up not pumping the active
    // instance, which silently breaks programmatic scrollTo animations).
    const lenis = new Lenis({
      duration: prefersReduced ? 0.1 : 1.15,
      smoothWheel: !prefersReduced,
      lerp: prefersReduced ? 1 : 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      autoRaf: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', (e: { scroll: number; limit: number; velocity: number }) => {
      const limit = e.limit || 1;
      const progress = Math.min(1, Math.max(0, e.scroll / limit));
      setScroll(progress, e.velocity);
    });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [setScroll]);

  return <>{children}</>;
}
