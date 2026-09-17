'use client';

import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Reveal from './Reveal';
import CosmicBadge from './CosmicBadge';

export default function SectionTwo() {
  const t = useTranslations('nova.capability');
  const rows = t.raw('rows') as { index: string; title: string; body: string }[];

  return (
    <section
      id="capability"
      className="flex min-h-screen flex-col justify-between px-5 pb-12 pt-24 supports-[height:100svh]:min-h-[100svh] sm:px-8 sm:pt-28 md:px-12 md:pb-16"
    >
      {/* Top row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <Reveal delay={120}>
          <CosmicBadge>{t('badge')}</CosmicBadge>
        </Reveal>

        <Reveal delay={220} className="max-w-sm sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            {t('intro')}
          </p>
        </Reveal>
      </div>

      {/* Bottom area */}
      <div className="flex flex-1 flex-col justify-end gap-12 md:flex-row md:items-end md:justify-between md:gap-16">
        {/* Left column */}
        <div className="max-w-xl">
          <Reveal delay={180}>
            <h2 className="text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              {t('titleLineOne')}
              <br />
              {t('titleLineTwo')}
            </h2>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-6 max-w-md text-sm text-white/80 drop-shadow-md sm:text-base">
              {t('body')}
            </p>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#solutions"
                className="inline-flex items-center gap-1 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85 sm:text-sm"
              >
                {t('runDemo')}
                <ChevronRight size={14} />
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
              >
                {t('freeConsult')}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right — frosted capability panel */}
        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 px-5 backdrop-blur-md sm:px-6">
          {rows.map((r, i) => (
            <Reveal key={r.index} delay={300 + i * 110}>
              <div
                className={`group flex gap-5 py-5 ${
                  i < rows.length - 1 ? 'border-b border-white/15' : ''
                }`}
              >
                <span className="font-mono text-[11px] tracking-[0.15em] text-white/55">
                  {r.index}
                </span>
                <div>
                  <h3 className="flex items-center gap-2 text-base font-medium text-white sm:text-lg">
                    {r.title}
                    <ChevronRight
                      size={16}
                      className="text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white"
                    />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                    {r.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
