import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'צור קשר — חוות דניאל מנוחת החיות',
  description:
    'צרו קשר עם חוות דניאל. טלפון/ווטסאפ: 052-3288557. ממוקמים ליד תל השומר, גוש דן. ביקורים בתיאום טלפוני.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        emoji="💬"
        title="צרו קשר"
        subtitle="אנו כאן עבורכם בכל שעה. הדרך המהירה ביותר היא בווטסאפ או בטלפון — נענה בהקדם, בסבלנות ובדיסקרטיות."
      />

      <section
        className="section-padding"
        aria-labelledby="contact-options-title"
      >
        <div className="container-content">
          <h2 id="contact-options-title" className="sr-only">
            דרכי יצירת קשר
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <a
              href="https://wa.me/9720523288557"
              target="_blank"
              rel="noopener noreferrer"
              className="card text-center hover:bg-[#25D366]/5 transition-colors group"
              aria-label="שליחת ווטסאפ"
            >
              <div
                className="w-16 h-16 mx-auto rounded-full bg-[#25D366] text-white flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              >
                💬
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-2">
                ווטסאפ
              </h3>
              <p className="text-text/80 mb-3">המהיר ביותר. נענה במהירות.</p>
              <span className="text-primary font-medium">
                לחצו לשליחת הודעה
              </span>
            </a>

            <a
              href="tel:0523288557"
              className="card text-center hover:bg-primary-light/40 transition-colors group"
              aria-label="התקשרו אלינו"
            >
              <div
                className="w-16 h-16 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              >
                📞
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-2">
                טלפון
              </h3>
              <p className="text-text/80 mb-3">דברו ישירות עם דניאל.</p>
              <span className="text-primary font-medium" dir="ltr">
                052-3288557
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
                מיקום
              </h3>
              <p className="text-text/80 mb-3">ליד תל השומר, גוש דן</p>
              <span className="text-primary font-medium">
                ביקורים בתיאום טלפוני
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="heading-md mb-3">שלחו לנו הודעה</h2>
              <p className="text-text/80 mb-6 leading-relaxed">
                מעדיפים לכתוב? מלאו את הטופס ונחזור אליכם בהקדם. כל פנייה
                נשמרת בדיסקרטיות מלאה.
              </p>
              <ContactForm />
            </div>

            <div>
              <h2 className="heading-md mb-3">כיצד להגיע</h2>
              <p className="text-text/80 mb-6 leading-relaxed">
                החווה ממוקמת באזור תל השומר בגוש דן. הכתובת המדויקת תינתן
                בתיאום הביקור. ניתן גם להזמין שירות הסעה במונית מהבית.
              </p>
              <div
                className="rounded-card overflow-hidden shadow-soft border border-primary-light/60"
                aria-label="מפת מיקום החווה"
              >
                <iframe
                  src="https://www.google.com/maps?q=Tel+Hashomer,+Israel&z=13&output=embed"
                  width="100%"
                  height="380"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="מפת אזור תל השומר — חוות דניאל"
                />
              </div>

              <div className="card mt-6">
                <h3 className="text-lg font-bold text-primary-dark mb-3 flex items-center gap-2">
                  <span aria-hidden="true">🕐</span>
                  שעות פעילות
                </h3>
                <ul className="space-y-2 text-text/80">
                  <li>
                    <strong>מענה טלפוני:</strong> 24/7 — דניאל מתגורר בחווה
                  </li>
                  <li>
                    <strong>ביקורים בחווה:</strong> בתיאום טלפוני בלבד
                  </li>
                  <li>
                    <strong>שירותי הסעה:</strong> זמינים בתיאום מראש
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
