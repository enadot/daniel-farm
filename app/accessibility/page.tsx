import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'הצהרת נגישות — חוות דניאל',
  description:
    'הצהרת הנגישות של אתר חוות דניאל. אנו מחויבים להנגיש את האתר לכל המשתמשים, לרבות אנשים עם מוגבלויות.',
};

export default function AccessibilityPage() {
  const updated = '10.05.2026';

  return (
    <>
      <PageHero
        emoji="♿"
        title="הצהרת נגישות"
        subtitle="חוות דניאל מחויבת להנגיש את האתר ואת השירותים לכל אדם, ללא תלות במגבלה."
      />

      <article
        className="section-padding"
        aria-labelledby="accessibility-content"
      >
        <div className="container-content max-w-3xl">
          <h2 id="accessibility-content" className="sr-only">
            תוכן הצהרת נגישות
          </h2>

          <div className="card space-y-8">
            <p className="text-sm text-text/60">
              עודכן לאחרונה: {updated}
            </p>

            <section>
              <h3 className="text-2xl font-bold text-primary-dark mb-3">
                כללי
              </h3>
              <p className="text-text/85 leading-relaxed">
                חוות דניאל — מנוחת החיות רואה חשיבות עליונה בהנגשת האתר
                והשירותים שלה לאנשים עם מוגבלויות, ופועלת לעמידה בדרישות
                תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות
                לשירות), התשע"ג—2013, ולתקן הישראלי 5568 ברמה AA.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-primary-dark mb-3">
                התאמות הנגישות באתר
              </h3>
              <ul className="space-y-2 text-text/85 leading-relaxed list-disc pr-5">
                <li>האתר תואם לתקן WCAG 2.1 ברמה AA, ככל הניתן.</li>
                <li>
                  האתר נבנה עם תמיכה מלאה בכיווניות עברית (RTL) ובניווט מקלדת.
                </li>
                <li>
                  ניתן לדלג ישירות לתוכן הראשי באמצעות קישור "דלג לתוכן הראשי"
                  המופיע במיקוד מקלדת.
                </li>
                <li>
                  כל התמונות באתר כוללות טקסט חלופי (alt) המתאר את התוכן.
                </li>
                <li>
                  שמות אזורים, כפתורים וקישורים מתויגים ב-aria-label בעברית.
                </li>
                <li>ניגודיות צבעים גבוהה בין טקסט לרקע.</li>
                <li>גודלי גופן ניתנים להגדלה בדפדפן ללא פגיעה בתצוגה.</li>
                <li>
                  האתר רספונסיבי ומותאם לטלפון נייד, טאבלט ומחשב שולחני.
                </li>
                <li>
                  טפסים כוללים תוויות ברורות והודעות שגיאה נגישות.
                </li>
                <li>
                  אין באתר תוכן המבוסס על הבזקים מהירים (העלולים לגרום לפרכוסים).
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-primary-dark mb-3">
                המלצות לשימוש
              </h3>
              <p className="text-text/85 leading-relaxed mb-3">
                לחוויית גלישה אופטימלית, אנו ממליצים להשתמש בגרסאות העדכניות של
                הדפדפנים הבאים:
              </p>
              <ul className="space-y-1 text-text/85 list-disc pr-5">
                <li>Google Chrome</li>
                <li>Mozilla Firefox</li>
                <li>Microsoft Edge</li>
                <li>Apple Safari</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-primary-dark mb-3">
                החרגות
              </h3>
              <p className="text-text/85 leading-relaxed">
                ייתכן ובאתר יימצאו רכיבים או דפים אשר טרם הונגשו במלואם, או שאינם
                תומכים בכלי עזר טכנולוגיים מסוימים. אנו פועלים באופן רציף לשיפור
                הנגישות באתר.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-primary-dark mb-3">
                פנייה בנושא נגישות
              </h3>
              <p className="text-text/85 leading-relaxed mb-4">
                אם נתקלתם בבעיית נגישות באתר, או אם יש לכם הצעות לשיפור — אנו
                נשמח לשמוע מכם. רכז הנגישות שלנו ישמח לסייע:
              </p>
              <ul className="space-y-2 text-text/85">
                <li>
                  <strong>שם:</strong> דניאל שאול
                </li>
                <li>
                  <strong>טלפון:</strong>{' '}
                  <a
                    href="tel:0523288557"
                    className="text-primary underline underline-offset-2"
                  >
                    052-3288557
                  </a>
                </li>
                <li>
                  <strong>ווטסאפ:</strong>{' '}
                  <a
                    href="https://wa.me/9720523288557"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    שליחת הודעה
                  </a>
                </li>
              </ul>
              <p className="text-text/75 text-sm leading-relaxed mt-4">
                אנו מתחייבים להגיב לפניות נגישות תוך זמן סביר ולפעול לפתרון
                במהירות האפשרית.
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
