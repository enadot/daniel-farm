import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact.meta' });
  return { title: t('title'), description: t('description') };
}

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');
  const tFooter = useTranslations('footer');

  return (
    <>
      <PageHero
        emoji="💬"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section
        className="section-padding"
        aria-labelledby="contact-options-title"
      >
        <div className="container-content">
          <h2 id="contact-options-title" className="sr-only">
            {t('options.srTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <a
              href="https://wa.me/9720523288557"
              target="_blank"
              rel="noopener noreferrer"
              className="card text-center hover:bg-[#25D366]/5 transition-colors group"
              aria-label={tFooter('whatsappAria')}
            >
              <div
                className="w-16 h-16 mx-auto rounded-full bg-[#25D366] text-white flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              >
                💬
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-2">
                {t('options.whatsapp.title')}
              </h3>
              <p className="text-text/80 mb-3">{t('options.whatsapp.desc')}</p>
              <span className="text-primary font-medium">
                {t('options.whatsapp.cta')}
              </span>
            </a>

            <a
              href="tel:0523288557"
              className="card text-center hover:bg-primary-light/40 transition-colors group"
              aria-label={tFooter('callAria')}
            >
              <div
                className="w-16 h-16 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              >
                📞
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-2">
                {t('options.phone.title')}
              </h3>
              <p className="text-text/80 mb-3">{t('options.phone.desc')}</p>
              <span className="text-primary font-medium" dir="ltr">
                {tCommon('phone')}
              </span>
            </a>

            <div className="card text-center">
              <div
                className="w-16 h-16 mx-auto rounded-full bg-primary-dark text-white flex items-center justify-center text-3xl mb-4"
                aria-hidden="true"
              >
                📍
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-2">
                {t('options.location.title')}
              </h3>
              <p className="text-text/80 mb-3">{t('options.location.desc')}</p>
              <span className="text-primary font-medium">
                {t('options.location.note')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="heading-md mb-3">{t('form.title')}</h2>
              <p className="text-text/80 mb-6 leading-relaxed">
                {t('form.intro')}
              </p>
              <ContactForm />
            </div>

            <div>
              <h2 className="heading-md mb-3">{t('directions.title')}</h2>
              <p className="text-text/80 mb-6 leading-relaxed">
                {t('directions.desc')}
              </p>
              <div
                className="rounded-card overflow-hidden shadow-soft border border-primary-light/60"
                aria-label={t('directions.mapAria')}
              >
                <iframe
                  src="https://www.google.com/maps?q=Tel+Hashomer,+Israel&z=13&output=embed"
                  width="100%"
                  height="380"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t('directions.mapTitle')}
                />
              </div>

              <div className="card mt-6">
                <h3 className="text-lg font-bold text-primary-dark mb-3 flex items-center gap-2">
                  <span aria-hidden="true">🕐</span>
                  {t('hours.title')}
                </h3>
                <ul className="space-y-2 text-text/80">
                  <li>
                    <strong>{t('hours.phone')}</strong> {t('hours.phoneValue')}
                  </li>
                  <li>
                    <strong>{t('hours.visits')}</strong>{' '}
                    {t('hours.visitsValue')}
                  </li>
                  <li>
                    <strong>{t('hours.transport')}</strong>{' '}
                    {t('hours.transportValue')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
