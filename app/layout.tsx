import type { Metadata } from 'next';
import { Heebo } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import './globals.css';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-heebo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chavat-daniel.co.il'),
  title: {
    default: 'חוות דניאל — מנוחת החיות | בית קברות לחיות מחמד',
    template: '%s | חוות דניאל — מנוחת החיות',
  },
  description:
    'חוות דניאל — בית הקברות הראשון לחיות מחמד בישראל, פועל מאז 1973 ליד תל השומר. קבורה, קרמטוריום, מצבות והסעות בכבוד ובאהבה לחיית המחמד שלכם.',
  keywords: [
    'בית קברות לחיות מחמד',
    'קבורת חיות',
    'חוות דניאל',
    'מנוחת החיות',
    'קרמטוריום לחיות',
    'מצבה לכלב',
    'מצבה לחתול',
    'גוש דן',
    'תל השומר',
  ],
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    siteName: 'חוות דניאל — מנוחת החיות',
    title: 'חוות דניאל — מנוחת החיות',
    description:
      'בית הקברות הראשון לחיות מחמד בישראל, פועל מאז 1973 מתוך אהבה לבעלי חיים.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body>
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
