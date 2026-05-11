import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations, useMessages } from 'next-intl';
import PageHero from '@/components/PageHero';
import SectionCard from '@/components/SectionCard';
import CTASection from '@/components/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sections.meta' });
  return { title: t('title'), description: t('description') };
}

const sectionKeys = ['marble', 'silk', 'garden', 'premium'] as const;
const sectionEmojis: Record<(typeof sectionKeys)[number], string> = {
  marble: '🏛️',
  silk: '🌸',
  garden: '🌳',
  premium: '⭐',
};

type SectionMessages = {
  sections: {
    items: Record<
      (typeof sectionKeys)[number],
      { title: string; atmosphere: string; description: string; features: string[] }
    >;
  };
};

export default function SectionsPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = useTranslations('sections');
  const messages = useMessages() as unknown as SectionMessages;

  return (
    <>
      <PageHero
        emoji="🌿"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className="section-padding" aria-label={t('hero.title')}>
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sectionKeys.map((key) => (
              <SectionCard
                key={key}
                emoji={sectionEmojis[key]}
                title={t(`items.${key}.title`)}
                atmosphere={t(`items.${key}.atmosphere`)}
                description={t(`items.${key}.description`)}
                features={messages.sections.items[key].features}
                includedLabel={t('included')}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-padding bg-primary-light/40"
        aria-labelledby="choice-title"
      >
        <div className="container-content max-w-3xl text-center">
          <h2 id="choice-title" className="heading-lg mb-6">
            {t('choice.title')}
          </h2>
          <p className="text-lg text-text/85 leading-relaxed mb-8">
            {t('choice.description')}
          </p>
          <a
            href="https://wa.me/9720523288557"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-lg !py-4 !px-8"
          >
            <span aria-hidden="true">💬</span>
            {t('choice.cta')}
          </a>
        </div>
      </section>

      <CTASection />
    </>
  );
}
