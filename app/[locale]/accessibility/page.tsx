import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations, useMessages } from 'next-intl';
import PageHero from '@/components/PageHero';
import RenderBuilderContent from '@/components/RenderBuilderContent';
import { getBuilderPage } from '@/lib/builder';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'accessibility.meta' });
  return { title: t('title'), description: t('description') };
}

type AccessibilityMessages = {
  accessibility: {
    features: { items: string[] };
  };
};

export default async function AccessibilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const builderContent = await getBuilderPage('/accessibility', locale);
  return (
    <AccessibilityPageBody builderContent={builderContent} locale={locale} />
  );
}

function AccessibilityPageBody({
  builderContent,
  locale,
}: {
  builderContent: Awaited<ReturnType<typeof getBuilderPage>>;
  locale: string;
}) {
  const t = useTranslations('accessibility');
  const messages = useMessages() as unknown as AccessibilityMessages;
  const items = messages.accessibility.features.items;

  return (
    <>
      <PageHero
        emoji="♿"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <article
        className="section-padding"
        aria-labelledby="accessibility-content"
      >
        <div className="container-content max-w-3xl">
          <h2 id="accessibility-content" className="sr-only">
            {t('srTitle')}
          </h2>

          <div className="card space-y-8">
            <p className="text-sm text-text/60">
              {t('updated', { date: '10.05.2026' })}
            </p>

            <section>
              <h3 className="text-2xl font-bold text-primary-dark mb-3">
                {t('general.title')}
              </h3>
              <p className="text-text/85 leading-relaxed">{t('general.body')}</p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-primary-dark mb-3">
                {t('features.title')}
              </h3>
              <ul className="space-y-2 text-text/85 leading-relaxed list-disc ps-5">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-primary-dark mb-3">
                {t('browsers.title')}
              </h3>
              <p className="text-text/85 leading-relaxed mb-3">
                {t('browsers.intro')}
              </p>
              <ul className="space-y-1 text-text/85 list-disc ps-5">
                <li>Google Chrome</li>
                <li>Mozilla Firefox</li>
                <li>Microsoft Edge</li>
                <li>Apple Safari</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-primary-dark mb-3">
                {t('exclusions.title')}
              </h3>
              <p className="text-text/85 leading-relaxed">{t('exclusions.body')}</p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-primary-dark mb-3">
                {t('contact.title')}
              </h3>
              <p className="text-text/85 leading-relaxed mb-4">
                {t('contact.intro')}
              </p>
              <ul className="space-y-2 text-text/85">
                <li>
                  <strong>{t('contact.name')}</strong> {t('contact.nameValue')}
                </li>
                <li>
                  <strong>{t('contact.phone')}</strong>{' '}
                  <a
                    href="tel:0523288557"
                    className="text-primary underline underline-offset-2"
                  >
                    052-3288557
                  </a>
                </li>
                <li>
                  <strong>{t('contact.whatsapp')}</strong>{' '}
                  <a
                    href="https://wa.me/9720523288557"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    {t('contact.whatsappLink')}
                  </a>
                </li>
              </ul>
              <p className="text-text/75 text-sm leading-relaxed mt-4">
                {t('contact.footer')}
              </p>
            </section>
          </div>
        </div>
      </article>

      <RenderBuilderContent
        content={builderContent}
        model="page"
        locale={locale}
      />
    </>
  );
}
