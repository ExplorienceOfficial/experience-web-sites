'use client';

import { useEffect, useRef, useState } from 'react';
import { Hexagon } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * Opening cover — a premium "preparing" screen that fades out once the
 * experience is ready. Uses the Cosmic Energy trio on the progress bar.
 */
export default function Loader() {
  const t = useTranslations('loader');
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1900;
    let raf = 0;

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      setProgress(100);
      setDone(true);
      window.setTimeout(() => setGone(true), 750);
    };

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);

    // Guaranteed dismissal even if rAF is throttled (e.g. backgrounded tab).
    const fallback = window.setTimeout(finish, 2600);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0d0e12] transition-opacity duration-700 ease-out ${
        done ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <Hexagon size={30} strokeWidth={1.2} className="mb-6 text-white/80" />
      <span className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
        explorience
      </span>

      <div className="mt-8 h-px w-56 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#8a2be2] via-[#00ffff] to-[#ff6347] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="mt-5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 tabular-nums">
        {t('line')} · {progress}%
      </span>
    </div>
  );
}
