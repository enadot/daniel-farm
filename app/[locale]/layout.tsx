import type { Metadata } from 'next';
import { Heebo, Inter } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { routing } from '@/i18n/routing';
import '../globals.css';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-heebo',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
});

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
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const direction = locale === 'he' ? 'rtl' : 'ltr';
  const fontClass = locale === 'he' ? heebo.variable : inter.variable;

  return (
    <html lang={locale} dir={direction} className={fontClass}>
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
