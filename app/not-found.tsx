import Link from 'next/link';
import { routing } from '@/i18n/routing';

export default function RootNotFound() {
  return (
    <html lang={routing.defaultLocale} dir="rtl">
      <head>
        <title>הדף לא נמצא — חוות דניאל</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Heebo', system-ui, sans-serif",
          backgroundColor: '#F7F5F0',
          color: '#2C2C2A',
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '32rem' }}>
          <div style={{ fontSize: '4.5rem', marginBottom: '1.25rem' }}>🌿</div>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#085041',
              marginBottom: '1rem',
            }}
          >
            הדף לא נמצא
          </h1>
          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.7,
              marginBottom: '2rem',
              opacity: 0.8,
            }}
          >
            ייתכן שהדף הוסר או שהקישור שגוי. תוכלו לחזור לדף הבית או ליצור איתנו
            קשר.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/"
              style={{
                background: '#1D9E75',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              חזרה לדף הבית
            </Link>
            <Link
              href="/contact"
              style={{
                background: 'white',
                color: '#085041',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 500,
                border: '1px solid #E1F5EE',
              }}
            >
              צור קשר
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
