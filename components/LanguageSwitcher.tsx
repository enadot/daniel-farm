'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

const labels: Record<string, string> = {
  he: 'עברית',
  en: 'EN',
  ru: 'RU',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('languages');
  const [, startTransition] = useTransition();

  function onChange(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="flex items-center" role="group" aria-label={t('label')}>
      <div className="flex rounded-soft border border-primary-light bg-white overflow-hidden">
        {routing.locales.map((loc) => {
          const isActive = loc === locale;
          return (
            <button
              key={loc}
              type="button"
              onClick={() => onChange(loc)}
              className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-primary-dark hover:bg-primary-light'
              }`}
              aria-pressed={isActive}
              aria-label={t(loc)}
            >
              {labels[loc] ?? loc.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
