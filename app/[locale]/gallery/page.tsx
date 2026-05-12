import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/PageHero';
import GalleryGrid from '@/components/GalleryGrid';
import CTASection from '@/components/CTASection';
import RenderBuilderContent from '@/components/RenderBuilderContent';
import { getBuilderPage } from '@/lib/builder';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'gallery.meta' });
  return { title: t('title'), description: t('description') };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const builderContent = await getBuilderPage('/gallery', locale);
  return <GalleryPageBody builderContent={builderContent} locale={locale} />;
}

function GalleryPageBody({
  builderContent,
  locale,
}: {
  builderContent: Awaited<ReturnType<typeof getBuilderPage>>;
  locale: string;
}) {
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

      <RenderBuilderContent
        content={builderContent}
        model="page"
        locale={locale}
      />

      <CTASection title={t('ctaTitle')} description={t('ctaDescription')} />
    </>
  );
}
