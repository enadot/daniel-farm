import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { routing } from '@/i18n/routing';
import '../globals.css';

const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2' +
  '?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700' +
  '&family=Heebo:wght@300;400;500;700' +
  '&family=Inter:wght@300;400;500;700' +
  '&display=swap';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  const tSite = await getTranslations({ locale, namespace: 'site' });

  return {
    metadataBase: new URL('https://chavat-daniel.co.il'),
    title: {
      default: t('title'),
      template: `%s | ${tSite('fullName')}`,
    },
    description: t('description'),
    openGraph: {
      type: 'website',
      locale: locale === 'he' ? 'he_IL' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: tSite('fullName'),
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const direction = locale === 'he' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href={GOOGLE_FONTS_URL} rel="stylesheet" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
