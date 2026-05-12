import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';

export const metadata: Metadata = {
  title: 'לוח בקרה — חוות דניאל',
  robots: { index: false, follow: false, noarchive: true },
};

const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700&display=swap';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href={GOOGLE_FONTS_URL} rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-bg text-text">{children}</body>
    </html>
  );
}
