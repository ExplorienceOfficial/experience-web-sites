'use client';

import { Hexagon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-white/10 px-5 py-10 sm:px-8 md:px-12">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5">
          <Hexagon size={20} strokeWidth={1.5} className="text-white/80" />
          <span className="text-base font-medium tracking-tight text-white">
            explorience
          </span>
          <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
            {t('tagline')}
          </span>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
          {t('rights')}
        </p>
      </div>
    </footer>
  );
}
