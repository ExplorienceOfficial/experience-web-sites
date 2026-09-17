'use client';

import { ChevronRight, MapPin, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Reveal from './Reveal';
import CosmicBadge from './CosmicBadge';

export default function Contact() {
  const t = useTranslations('contact');
  const email = t('email');

  return (
    <section
      id="contact"
      className="flex min-h-screen flex-col justify-between px-5 pb-16 pt-24 supports-[height:100svh]:min-h-[100svh] sm:px-8 sm:pt-28 md:px-12"
    >
      {/* Top badge */}
      <Reveal>
        <CosmicBadge>{t('tag')}</CosmicBadge>
      </Reveal>

      {/* Bottom area */}
      <div className="flex flex-1 flex-col justify-end gap-12 md:flex-row md:items-end md:justify-between md:gap-16">
        {/* Left — headline + CTA */}
        <div className="max-w-xl">
          <Reveal delay={140}>
            <h2 className="text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              {t('titleLineOne')}
              <br />
              {t('titleLineTwo')}
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-6 max-w-md text-sm text-white/80 drop-shadow-md sm:text-base">
              {t('body')}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <a
              href={`mailto:${email}`}
              className="mt-8 inline-flex items-center gap-1 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-white/85"
            >
              {t('cta')}
              <ChevronRight size={16} />
            </a>
          </Reveal>
        </div>

        {/* Right — office + email panel */}
        <Reveal delay={320} className="w-full max-w-sm">
          <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md">
            <div className="flex items-start gap-4 border-b border-white/15 px-6 py-5">
              <MapPin size={18} className="mt-0.5 shrink-0 text-white/50" />
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                  {t('officeTag')}
                </span>
                <p className="mt-1 text-base font-medium text-white">{t('office')}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/60">
                  {t('address')}
                </p>
              </div>
            </div>
            <a
              href={`mailto:${email}`}
              className="group flex items-start gap-4 px-6 py-5 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <Mail size={18} className="mt-0.5 shrink-0 text-white/50" />
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                  {t('emailTag')}
                </span>
                <p className="mt-1 flex items-center gap-1 text-base font-medium text-white">
                  {email}
                  <ChevronRight
                    size={15}
                    className="text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </p>
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
