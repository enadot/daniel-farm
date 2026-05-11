import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'אודות חוות דניאל — הסיפור של דניאל שאול מ-1973',
  description:
    'הסיפור של חוות דניאל ובעליה דניאל שאול. בית הקברות הראשון לחיות מחמד בישראל, פועל ברציפות מאז 1973 מתוך אהבה לבעלי חיים.',
};

const timeline = [
  {
    year: '1973',
    title: 'הקמת החווה',
    desc: 'דניאל שאול הקים את בית הקברות הראשון לחיות מחמד בישראל, מתוך הבנה שגם לחיות אהובות מגיעה פרידה ראויה.',
  },
  {
    year: '1980—1990',
    title: 'הרחבת החלקות',
    desc: 'נוספו חלקות חדשות והותאמו לסגנונות שונים, כדי להעניק למשפחות יותר אפשרויות בחירה.',
  },
  {
    year: '2000',
    title: 'הוספת קרמטוריום',
    desc: 'הוקמו מתקני קרמטוריום מודרניים שאיפשרו ללוות את המשפחות גם באופן זה.',
  },
  {
    year: '2010—היום',
    title: 'דור המשך וטכנולוגיה',
    desc: 'שילוב כלי תקשורת מודרניים, ווטסאפ ושירותי הסעה — כדי להקל על המשפחות בכל שלב.',
  },
  {
    year: 'היום',
    title: '50+ שנות פעילות',
    desc: 'אלפי משפחות ליווינו לאורך השנים. דניאל ממשיך להתגורר בחווה ונמצא שם עבורכם תמיד, עם השגחה אישית רציפה.',
  },
];

const values = [
  {
    icon: '❤️',
    title: 'אהבה לבעלי חיים',
    desc: 'זה הליבה של מי שאנחנו. כל פעולה במקום הזה נובעת מאהבה אמיתית, עמוקה, ולא מתמרון.',
  },
  {
    icon: '🤲',
    title: 'יחס אישי',
    desc: 'אין שני מקרים זהים. כל משפחה מקבלת ליווי מותאם, סבלני, ומלא בכבוד — בקצב שלה.',
  },
  {
    icon: '✨',
    title: 'מקצועיות בלי פשרות',
    desc: 'תהליך מסודר, מצבות איכותיות, תחזוקה רציפה. עוסקים בזה ברצינות כי לכך מגיע.',
  },
  {
    icon: '🤫',
    title: 'דיסקרטיות',
    desc: 'כל פנייה היא אישית ושמורה. אנו מכבדים את הרגישות של הרגעים הללו.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        emoji="🌿"
        title="הסיפור שלנו"
        subtitle="50+ שנות פעילות, אלפי משפחות, אינסוף זכרונות מלאי אהבה. הכירו את חוות דניאל ואת האיש שמאחורי המקום."
      />

      <section className="section-padding" aria-labelledby="story-title">
        <div className="container-content max-w-4xl">
          <h2 id="story-title" className="heading-lg mb-8 text-center">
            דניאל שאול — האיש שמאחורי המקום
          </h2>
          <div className="space-y-6 text-lg text-text/85 leading-relaxed">
            <p>
              ב-1973, כשמעט אף אחד בישראל לא דיבר על "פרידה מכובדת מחיית
              מחמד", דניאל שאול ראה דברים אחרת. הוא גדל מוקף בבעלי חיים,
              אהב אותם בכל ליבו, וידע מקרוב את הכאב שמלווה איבוד של חבר
              נאמן. הוא לא הבין למה למשפחות לא תהיה אפשרות פשוטה ומכובדת
              להניח את החיה האהובה שלהן למנוחות.
            </p>
            <p>
              אז הוא עשה משהו פשוט אבל מהפכני: הקים את בית הקברות הראשון
              לחיות מחמד בישראל. בלי להתבייש, בלי להתנצל. מקום שבו הכבוד
              שמגיע לחיה מאוהבת לא יהיה תלוי במישהו אחר.
            </p>
            <p>
              חמישים שנה אחר כך, החווה ממשיכה לפעול ברציפות. השם שונה,
              המקום גדל, אבל הלב נשאר אותו לב. דניאל עדיין מתגורר בחווה,
              עדיין עונה לטלפונים בעצמו, עדיין דואג שכל מצבה תהיה מטופחת
              וכל משפחה תקבל את היחס שמגיע לה.
            </p>
            <div className="bg-primary-light/60 border-r-4 border-primary p-6 rounded-soft my-8">
              <p className="text-primary-dark font-medium leading-relaxed">
                "בשבילי זה לא עסק. זה ייעוד. כל חיה שבאה לכאן הייתה
                למישהו הכל בעולם — ואני רואה את זה כתפקיד שלי לכבד את
                האהבה הזאת."
              </p>
              <p className="text-primary-dark/80 mt-3 text-sm">
                — דניאל שאול, מייסד חוות דניאל
              </p>
            </div>
            <p>
              <strong className="text-primary-dark">
                דניאל מתגורר בחווה
              </strong>
              {' — '}
              זה לא משפט שיווקי. זה אומר שאין שעה שבה המקום לא בהשגחה. זה
              אומר שאם תתקשרו ב-22:00 כי קרה משהו, מישהו יענה. זה אומר
              שהמצבות מטופחות, שהגנים נקיים, ושהכל זוכה לתשומת לב יומיומית
              ולא רק כשמתאים.
            </p>
          </div>
        </div>
      </section>

      <section
        className="section-padding bg-primary-light/40"
        aria-labelledby="values-title"
      >
        <div className="container-content">
          <h2 id="values-title" className="heading-lg text-center mb-12">
            הערכים שמנחים אותנו
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <article key={value.title} className="card">
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-soft bg-primary-light flex items-center justify-center text-3xl flex-shrink-0"
                    aria-hidden="true"
                  >
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-dark mb-2">
                      {value.title}
                    </h3>
                    <p className="text-text/80 leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="timeline-title">
        <div className="container-content max-w-3xl">
          <h2 id="timeline-title" className="heading-lg text-center mb-12">
            ציר הזמן
          </h2>
          <ol className="relative border-r-2 border-primary/30 pr-6 space-y-10">
            {timeline.map((item) => (
              <li key={item.year} className="relative">
                <div
                  className="absolute -right-[33px] top-1 w-6 h-6 rounded-full bg-primary border-4 border-bg shadow-soft"
                  aria-hidden="true"
                />
                <div className="text-primary font-bold text-lg mb-1">
                  {item.year}
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-text/80 leading-relaxed">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        title="הצטרפו לאלפי המשפחות שליווינו"
        description="אם אתם זקוקים לליווי, אנו כאן. תרגישו חופשי לפנות בכל שעה."
      />
    </>
  );
}
