'use client';

import { useTranslations } from 'next-intl';
import Reveal from './Reveal';
import CosmicBadge from './CosmicBadge';

export default function About() {
  const t = useTranslations('about');
  const cards = t.raw('cards') as { tag: string; title: string; desc: string }[];

  return (
    <section id="about" className="px-5 py-24 sm:px-8 sm:py-32 md:px-12">
      {/* Header */}
      <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <CosmicBadge>{t('tag')}</CosmicBadge>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-5 max-w-xl text-4xl font-normal leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
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

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={120 + i * 90}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.035] p-8 backdrop-blur-md transition-colors duration-300 hover:border-white/25">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/45">
                {c.tag}
              </span>
              <h3 className="mt-4 text-2xl font-medium text-white">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
