import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/PageHero';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services.meta' });
  return { title: t('title'), description: t('description') };
}

const serviceKeys = [
  'burial',
  'cremation',
  'headstone',
  'transport',
  'visitors',
  'maintenance',
] as const;

const serviceIcons: Record<(typeof serviceKeys)[number], string> = {
  burial: '🌿',
  cremation: '🕯️',
  headstone: '🪨',
  transport: '🚖',
  visitors: '🌷',
  maintenance: '🛡️',
};

const stepKeys = ['step1', 'step2', 'step3', 'step4', 'step5'] as const;

export default function ServicesPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = useTranslations('services');

  return (
    <>
      <PageHero
        emoji="🌿"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className="section-padding" aria-label={t('hero.title')}>
        <div className="container-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceKeys.map((key) => (
              <ServiceCard
                key={key}
                icon={serviceIcons[key]}
                title={t(`items.${key}.title`)}
                description={t(`items.${key}.description`)}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-padding bg-primary-light/40"
        aria-labelledby="how-it-works"
      >
        <div className="container-content max-w-4xl">
          <h2 id="how-it-works" className="heading-lg text-center mb-12">
            {t('how.title')}
          </h2>
          <ol className="space-y-6">
            {stepKeys.map((key, i) => (
              <li key={key} className="flex gap-5 items-start">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shadow-soft"
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-dark mb-1">
                    {t(`how.${key}.title`)}
                  </h3>
                  <p className="text-text/80 leading-relaxed">
                    {t(`how.${key}.desc`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        title={t('ctaTitle')}
        description={t('ctaDescription')}
      />
    </>
  );
}
