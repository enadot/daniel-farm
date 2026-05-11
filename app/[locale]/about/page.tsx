import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.meta' });
  return { title: t('title'), description: t('description') };
}

const timelineKeys = [
  'founded',
  'expansion',
  'crematorium',
  'modern',
  'today',
] as const;

const valueKeys = ['love', 'personal', 'professional', 'discreet'] as const;
const valueIcons: Record<(typeof valueKeys)[number], string> = {
  love: '❤️',
  personal: '🤲',
  professional: '✨',
  discreet: '🤫',
};

export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = useTranslations('about');

  return (
    <>
      <PageHero
        emoji="🌿"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className="section-padding" aria-labelledby="story-title">
        <div className="container-content max-w-4xl">
          <h2 id="story-title" className="heading-lg mb-8 text-center">
            {t('story.title')}
          </h2>
          <div className="space-y-6 text-lg text-text/85 leading-relaxed">
            <p>{t('story.p1')}</p>
            <p>{t('story.p2')}</p>
            <p>{t('story.p3')}</p>
            <div className="bg-primary-light/60 border-s-4 border-primary p-6 rounded-soft my-8">
              <p className="text-primary-dark font-medium leading-relaxed">
                &ldquo;{t('story.quote')}&rdquo;
              </p>
              <p className="text-primary-dark/80 mt-3 text-sm">
                {t('story.quoteAttribution')}
              </p>
            </div>
            <p>
              <strong className="text-primary-dark">{t('story.p4a')}</strong>
              {t('story.p4b')}
            </p>
          </div>
        </div>
      </section>

      <section
        className="section-padding bg-primary-light/40"
        aria-labelledby="values-title"
      >
        <div className="container-content">
          <h2 id="values-title" className="heading-lg text-center mb-12">
            {t('values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {valueKeys.map((key) => (
              <article key={key} className="card">
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-soft bg-primary-light flex items-center justify-center text-3xl flex-shrink-0"
                    aria-hidden="true"
                  >
                    {valueIcons[key]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-dark mb-2">
                      {t(`values.items.${key}.title`)}
                    </h3>
                    <p className="text-text/80 leading-relaxed">
                      {t(`values.items.${key}.desc`)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="timeline-title">
        <div className="container-content max-w-3xl">
          <h2 id="timeline-title" className="heading-lg text-center mb-12">
            {t('timeline.title')}
          </h2>
          <ol className="relative border-s-2 border-primary/30 ps-6 space-y-10">
            {timelineKeys.map((key) => (
              <li key={key} className="relative">
                <div
                  className="absolute -start-[33px] top-1 w-6 h-6 rounded-full bg-primary border-4 border-bg shadow-soft"
                  aria-hidden="true"
                />
                <div className="text-primary font-bold text-lg mb-1">
                  {t(`timeline.items.${key}.year`)}
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">
                  {t(`timeline.items.${key}.title`)}
                </h3>
                <p className="text-text/80 leading-relaxed">
                  {t(`timeline.items.${key}.desc`)}
                </p>
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
