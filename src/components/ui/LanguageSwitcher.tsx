'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';

const LOCALES = ['tr', 'en'] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const switchTo = (next: string) => {
    if (next === locale || pending) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className="relative flex items-center rounded-full border border-white/20 bg-white/10 p-1 font-mono text-[10px] backdrop-blur-md">
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            onClick={() => switchTo(l)}
            className={`relative z-10 rounded-full px-2.5 py-1 uppercase tracking-[0.15em] transition-colors duration-300 ${
              active ? 'text-black' : 'text-white/60 hover:text-white'
            }`}
          >
            {active && (
              <span className="absolute inset-0 -z-10 rounded-full bg-white" />
            )}
            {l}
          </button>
        );
      })}
    </div>
  );
}
