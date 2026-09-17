'use client';

import { useEffect, useState } from 'react';
import { Hexagon, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Reveal from './Reveal';
import LanguageSwitcher from './LanguageSwitcher';
import { scrollToId } from '@/lib/lenis';

export default function Navbar() {
  const t = useTranslations('nova.nav');
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const links = [
    { href: 'solutions', label: t('projects'), sup: '9' },
    { href: 'capability', label: t('blog') },
    { href: 'about', label: t('about') },
    { href: 'contact', label: t('contact') },
  ];

  // Hide the bar when scrolling down, reveal it when scrolling up.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 80) setHidden(false); // always visible near the top
        else if (y > last + 6) setHidden(true); // scrolling down
        else if (y < last - 6) setHidden(false); // scrolling up
        last = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/15 transition-transform duration-500 ease-out ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 sm:px-8 md:px-12">
          {/* Logo */}
          <Reveal delay={0}>
            <a
              href="#top"
              onClick={(e) => go(e, 'top')}
              className="flex items-center gap-2 text-lg font-medium tracking-tight text-white sm:text-xl"
            >
              <Hexagon size={24} strokeWidth={1.5} className="drop-shadow-md" />
              <span className="drop-shadow-md">explorience</span>
            </a>
          </Reveal>

          {/* Center nav (md+) */}
          <nav className="hidden items-center gap-8 md:flex lg:gap-10">
            {links.map((l, i) => (
              <Reveal key={l.href} delay={100 + i * 100}>
                <a
                  href={`#${l.href}`}
                  onClick={(e) => go(e, l.href)}
                  className="text-sm text-white/85 drop-shadow transition-colors duration-300 hover:text-white"
                >
                  {l.label}
                  {l.sup && (
                    <sup className="ml-0.5 font-mono text-[10px] text-white/60">
                      {l.sup}
                    </sup>
                  )}
                </a>
              </Reveal>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <Reveal delay={500}>
              <a
                href="#contact"
                onClick={(e) => go(e, 'contact')}
                className="rounded-md border border-white/20 bg-white/15 px-4 py-2 text-xs backdrop-blur-md drop-shadow transition-colors duration-300 hover:bg-white/25 sm:px-5 sm:text-sm"
              >
                {t('cta')}
              </a>
            </Reveal>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t('close') : t('menu')}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-white/10 backdrop-blur-md md:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#0d0e12]/90 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={`#${l.href}`}
              onClick={(e) => go(e, l.href)}
              className="text-2xl font-medium text-white/90"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </>
  );
}
