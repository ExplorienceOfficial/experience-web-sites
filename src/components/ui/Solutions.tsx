'use client';

import { useTranslations } from 'next-intl';
import Reveal from './Reveal';
import CosmicBadge from './CosmicBadge';

export default function Solutions() {
  const t = useTranslations('solutions');
  const items = t.raw('items') as { tag: string; title: string; desc: string }[];

  return (
    <section
      id="solutions"
      className="px-5 py-24 sm:px-8 sm:py-32 md:px-12"
    >
      {/* Header */}
      <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <CosmicBadge>{t('tag')}</CosmicBadge>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-5 max-w-xl text-4xl font-normal leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-5xl">
              {t('title')}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={170} className="md:max-w-xs md:text-right">
          <p className="text-sm leading-relaxed text-white/70 drop-shadow-md sm:text-base">
            {t('lead')}
          </p>
        </Reveal>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={100 + i * 60}>
            <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.15em] text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/45">
                  {it.tag}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-medium text-white sm:text-xl">
                {it.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {it.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
