'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// WebGL can only initialise on the client — never SSR the canvas.
const NovaScene = dynamic(() => import('./NovaScene'), { ssr: false });

export default function CanvasWrapper() {
  // react-three-fiber measures its container once on mount; in this embedded
  // pane the ResizeObserver is flaky and can leave the canvas at its 300x150
  // default. Sizing the container with explicit pixels (and only mounting the
  // scene once we have a real, non-zero size) guarantees r3f's first, synchronous
  // measurement is valid — no deadlock, no dependence on the observer firing.
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    let mounted = false;
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w > 0 && h > 0) {
        mounted = true;
        setSize((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }));
      }
    };
    update();
    // r3f's first internal measurement is unreliable in this pane; a genuine
    // `resize` event routes through its full re-measure path and corrects the
    // canvas. Fire a few (only while the viewport is real) after the scene mounts.
    const kick = () => {
      if (window.innerWidth > 0 && window.innerHeight > 0) {
        window.dispatchEvent(new Event('resize'));
      }
    };
    const ids = [100, 300, 600, 1200].map((t) => window.setTimeout(update, t));
    const kicks = [250, 700, 1400, 2400].map((t) => window.setTimeout(kick, t));
    // Poll until we get a real viewport (covers loading while backgrounded,
    // where innerWidth can read 0 and no resize event fires on wake).
    const poll = window.setInterval(() => {
      if (mounted) window.clearInterval(poll);
      else update();
    }, 400);
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      ids.forEach((id) => window.clearTimeout(id));
      kicks.forEach((id) => window.clearTimeout(id));
      window.clearInterval(poll);
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 bg-[#0d0e12]"
      style={{
        width: size ? `${size.w}px` : '100vw',
        height: size ? `${size.h}px` : '100dvh',
      }}
    >
      {size && <NovaScene />}
    </div>
  );
}
