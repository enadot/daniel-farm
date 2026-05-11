import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/PageHero';
import GalleryGrid from '@/components/GalleryGrid';
import CTASection from '@/components/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'gallery.meta' });
  return { title: t('title'), description: t('description') };
}

export default function GalleryPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = useTranslations('gallery');

  return (
    <>
      <PageHero
        emoji="📸"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className="section-padding" aria-label={t('aria')}>
        <div className="container-content">
          <p className="text-center text-text/75 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('intro')}
          </p>
          <GalleryGrid />
        </div>
      </section>

      <CTASection title={t('ctaTitle')} description={t('ctaDescription')} />
    </>
  );
}
