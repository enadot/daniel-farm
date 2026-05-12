import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import TrustBar from '@/components/TrustBar';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import HomeCarousel from '@/components/HomeCarousel';
import CallbackForm from '@/components/CallbackForm';
import SeoContent from '@/components/SeoContent';
import RenderBuilderContent from '@/components/RenderBuilderContent';
import { getBuilderPage } from '@/lib/builder';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  return { title: t('title'), description: t('description') };
}

const homeServiceKeys = ['burial', 'cremation', 'headstone', 'transport'] as const;
const homeServiceIcons: Record<(typeof homeServiceKeys)[number], string> = {
  burial: '🌿',
  cremation: '🕯️',
  headstone: '🪨',
  transport: '🚖',
};

const homeSectionKeys = ['marble', 'silk', 'garden', 'premium'] as const;
const homeSectionEmojis: Record<(typeof homeSectionKeys)[number], string> = {
  marble: '🏛️',
  silk: '🌸',
  garden: '🌳',
  premium: '🤍',
};

const statKeys = ['years', 'founded', 'available', 'personal'] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const builderContent = await getBuilderPage('/', locale);
  return <HomePageBody builderContent={builderContent} locale={locale} />;
}

function HomePageBody({
  builderContent,
  locale,
}: {
  builderContent: Awaited<ReturnType<typeof getBuilderPage>>;
  locale: string;
}) {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');

  return (
    <>
      <section
        className="relative min-h-[600px] md:min-h-[680px] flex items-center text-white overflow-hidden"
        aria-labelledby="home-hero-title"
      >
        <img
          src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1920&q=80"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0 bg-gradient-to-bl from-[#0a3a30]/90 via-primary-dark/85 to-[#062a23]/95"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-25"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 25% 30%, rgba(93, 202, 165, 0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(225, 245, 238, 0.25) 0%, transparent 55%), repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 12px)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg/30 to-transparent"
          aria-hidden="true"
        />
        <div className="relative container-content py-20 text-center md:text-start">
          <p className="inline-block bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm md:text-base text-primary-light mb-6 border border-white/15">
            <span aria-hidden="true">✦ </span>
            {t('hero.badge')}
          </p>
          <h1
            id="home-hero-title"
            className="heading-xl text-white mb-6 max-w-3xl"
          >
            {t('hero.titleLine1')}
            <br />
            <span className="text-accent">{t('hero.titleLine2')}</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-light/95 max-w-2xl mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/contact"
              className="btn-whatsapp text-lg !py-4 !px-8"
              aria-label={tCommon('contactCta')}
            >
              <span aria-hidden="true">💬</span>
              {t('hero.ctaContact')}
            </Link>
            <Link
              href="/services"
              className="btn-secondary text-lg !py-4 !px-8 !bg-white/10 !text-white !border-white/30 hover:!bg-white/20"
            >
              {t('hero.ctaServices')}
            </Link>
          </div>
        </div>
      </section>

      <TrustBar />

      <CallbackForm />

      <section className="section-padding" aria-labelledby="services-title">
        <div className="container-content">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 id="services-title" className="heading-lg mb-4">
              {t('services.title')}
            </h2>
            <p className="text-lg text-text/80 leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeServiceKeys.map((key) => (
              <ServiceCard
                key={key}
                icon={homeServiceIcons[key]}
                title={t(`services.items.${key}.title`)}
                description={t(`services.items.${key}.description`)}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-primary">
              {t('services.viewAll')}
              <span aria-hidden="true">←</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="section-padding bg-primary-light/40"
        aria-labelledby="why-us-title"
      >
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="why-us-title" className="heading-lg mb-6">
                {t('whyUs.title')}
              </h2>
              <div className="space-y-5 text-text/85 leading-relaxed text-lg">
                <p>{t('whyUs.p1')}</p>
                <p>{t('whyUs.p2')}</p>
                <p>
                  <strong className="text-primary-dark">
                    {t('whyUs.p3a')}
                  </strong>
                  {t('whyUs.p3b')}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {statKeys.map((key) => (
                <div
                  key={key}
                  className="bg-white rounded-card shadow-soft p-6 text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {t(`whyUs.stats.${key}Value`)}
                  </div>
                  <div className="text-sm text-text/70">
                    {t(`whyUs.stats.${key}Label`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="sections-title">
        <div className="container-content">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 id="sections-title" className="heading-lg mb-4">
              {t('sections.title')}
            </h2>
            <p className="text-lg text-text/80 leading-relaxed">
              {t('sections.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeSectionKeys.map((key) => (
              <article key={key} className="card text-center">
                <div
                  className="w-20 h-20 mx-auto rounded-full bg-primary-light flex items-center justify-center text-4xl mb-4"
                  aria-hidden="true"
                >
                  {homeSectionEmojis[key]}
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-3">
                  {t(`sections.items.${key}.title`)}
                </h3>
                <p className="text-text/80 leading-relaxed">
                  {t(`sections.items.${key}.description`)}
                </p>
              </article>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/sections" className="btn-primary">
              {t('sections.viewAll')}
              <span aria-hidden="true">←</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-primary-light/40">
        <HomeCarousel />
      </div>

      <SeoContent />

      <RenderBuilderContent
        content={builderContent}
        model="page"
        locale={locale}
      />

      <CTASection />
    </>
  );
}
