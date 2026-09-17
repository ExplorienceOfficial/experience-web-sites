'use client';

import { useTranslations } from 'next-intl';
import Reveal from './Reveal';

export default function SectionOne() {
  const t = useTranslations('nova.hero');
  const services = t.raw('services') as string[];

  return (
    <section
      id="top"
      className="flex min-h-screen flex-col justify-between px-5 pb-12 pt-24 supports-[height:100svh]:min-h-[100svh] sm:px-8 sm:pt-28 md:px-12 md:pb-16"
    >
      {/* Top row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        {/* Service list */}
        <div className="flex flex-col gap-2">
          {services.map((s, i) => (
            <Reveal key={s} delay={150 + i * 120}>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">
                / {s}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Intro */}
        <Reveal delay={300} className="max-w-xs sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            {t('intro')}
          </p>
        </Reveal>
      </div>

      {/* Bottom row — badge + headline */}
      <div>
        <Reveal delay={150}>
          <span className="mb-5 inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
            {t('badge')}
          </span>
        </Reveal>

        <Reveal delay={280}>
          <h1 className="text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
            {t('titleLineOne')}
            <br />
            {t('titleLineTwo')}
          </h1>
        </Reveal>
      </div>
    </section>
  );
}
