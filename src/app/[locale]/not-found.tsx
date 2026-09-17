'use client';

import { Hexagon, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#0d0e12] px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12),transparent_60%)]" />

      <Hexagon size={28} strokeWidth={1.5} className="mb-6 text-white/70" />
      <h1 className="text-[26vw] font-normal leading-none tracking-tight text-white drop-shadow-lg sm:text-[16rem]">
        {t('code')}
      </h1>
      <h2 className="mt-2 text-2xl font-medium text-white sm:text-4xl">
        {t('title')}
      </h2>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
        {t('message')}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-1 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-colors duration-300 hover:bg-white/85"
      >
        {t('btn')}
        <ChevronRight size={16} />
      </Link>
    </div>
  );
}
