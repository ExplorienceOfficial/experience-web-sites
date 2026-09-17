'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/**
 * Fade-up reveal (spec: threshold 0.15, translate-y-8 → 0, 700ms ease-out,
 * per-element transition-delay).
 *
 * Elements already on-screen at mount reveal right away instead of waiting on
 * IntersectionObserver (whose callbacks can be delayed by the WebGL render
 * loop). Off-screen elements observe for scroll-in, with a safety fallback so
 * content can never get stuck hidden.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    // Already visible on mount → reveal without depending on IO.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      const id = window.setTimeout(() => setShown(true), 40);
      return () => window.clearTimeout(id);
    }

    let fallback = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
          window.clearTimeout(fallback);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    // Safety net in case IO delivery is starved.
    fallback = window.setTimeout(() => setShown(true), 2200);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(2rem)',
        transition: `opacity 700ms ease-out ${delay}ms, transform 700ms ease-out ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
