'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="min-h-[60vh] flex items-center justify-center text-center px-4">
      <div className="max-w-lg">
        <div className="text-7xl mb-6" aria-hidden="true">
          🌿
        </div>
        <h1 className="heading-lg mb-4">{t('title')}</h1>
        <p className="text-lg text-text/80 mb-8 leading-relaxed">
          {t('description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            {t('home')}
          </Link>
          <Link href="/contact" className="btn-secondary">
            {t('contact')}
          </Link>
        </div>
      </div>
    </section>
  );
}
