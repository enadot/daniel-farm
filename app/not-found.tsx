import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center text-center px-4">
      <div className="max-w-lg">
        <div className="text-7xl mb-6" aria-hidden="true">🌿</div>
        <h1 className="heading-lg mb-4">העמוד לא נמצא</h1>
        <p className="text-lg text-text/80 mb-8 leading-relaxed">
          ייתכן שהעמוד הוסר, או שהקישור שגוי. תוכלו לחזור לדף הבית או ליצור
          איתנו קשר.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            חזרה לדף הבית
          </Link>
          <Link href="/contact" className="btn-secondary">
            צור קשר
          </Link>
        </div>
      </div>
    </section>
  );
}
