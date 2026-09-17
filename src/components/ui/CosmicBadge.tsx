import type { ReactNode } from 'react';

/**
 * Section kicker badge whose label softly flows through the Cosmic Energy trio
 * (#8A2BE2 · #00FFFF · #FF6347) — a futuristic holographic colour animation.
 */
export default function CosmicBadge({ children }: { children: ReactNode }) {
  return (
    <span className="cosmic-badge inline-block border-l-2 bg-white/15 px-3 py-1.5 backdrop-blur-md drop-shadow-md">
      <span className="cosmic-text font-mono text-[11px] uppercase tracking-[0.15em]">
        {children}
      </span>
    </span>
  );
}
