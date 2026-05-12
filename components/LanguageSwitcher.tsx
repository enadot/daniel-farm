'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname, routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

const flagMap: Record<Locale, string> = {
  he: '🇮🇱',
  en: '🇬🇧',
  ru: '🇷🇺',
};

const nativeLabels: Record<Locale, string> = {
  he: 'עברית',
  en: 'English',
  ru: 'Русский',
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('languages');
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function choose(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-soft border border-primary-light bg-white px-2.5 py-1.5 text-sm font-medium text-primary-dark hover:bg-primary-light/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('label')}
      >
        <span className="text-base leading-none" aria-hidden="true">
          {flagMap[locale]}
        </span>
        <span className="hidden sm:inline">{nativeLabels[locale]}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 4.5 6 7.5 9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('label')}
          className="absolute end-0 mt-2 min-w-[160px] rounded-card bg-white shadow-soft-lg border border-primary-light overflow-hidden z-50 py-1"
        >
          {routing.locales.map((loc) => {
            const isActive = loc === locale;
            return (
              <li key={loc} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => choose(loc as Locale)}
                  className={`flex items-center gap-2.5 w-full text-start px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-primary-light text-primary-dark font-semibold'
                      : 'text-text hover:bg-primary-light/60'
                  }`}
                >
                  <span className="text-base leading-none" aria-hidden="true">
                    {flagMap[loc as Locale]}
                  </span>
                  <span>{nativeLabels[loc as Locale]}</span>
                  {isActive && (
                    <span
                      className="ms-auto text-primary"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
