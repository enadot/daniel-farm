import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'השירותים שלנו — קבורה, קרמטוריום ומצבות לחיות מחמד',
  description:
    'מגוון שירותים לחיית המחמד שלכם: קבורה בחלקה לבחירתכם, שירותי קרמטוריום, הקמת מצבה אישית, הסעות, ופינת מבקרים. ליווי אישי וזמינות מלאה עבורכם.',
};

const services = [
  {
    icon: '🌿',
    title: 'קבורה בחלקה לבחירתכם',
    description:
      'בחוות דניאל אנו מציעים ארבע חלקות שונות באופיין ובאווירתן, כדי שתוכלו לבחור את המקום שמתאים בדיוק לזכר חיית המחמד שלכם. הקבורה כוללת הכנת המקום, טקס מכבד וליווי אישי לאורך כל התהליך. אנו דואגים לכל פרט — מתעודת קבורה ועד לטיפוח החלקה לאורך השנים.',
  },
  {
    icon: '🕯️',
    title: 'שירותי קרמטוריום',
    description:
      'תהליך השריפה מתבצע בקפידה ובכבוד, עם אפשרות לקבל את האפר באורן אישית בכלי שתבחרו, או לפזרו באחת מחלקות החווה. אנו מספקים תעודת אישור רשמית, ומלווים אתכם בכל שאלה והחלטה. הכל בדיסקרטיות מלאה ותוך הקפדה על כבוד החיה ובני המשפחה.',
  },
  {
    icon: '🪨',
    title: 'הקמת מצבה אישית',
    description:
      'מצבה היא לא רק אבן — היא הצהרת אהבה. אנו מציעים מגוון רחב של מצבות בשיש, גרניט ופלסטיק יוקרתי, עם חריטה אישית של שם החיה, תאריכים, תמונה וטקסט לבחירתכם. תוכלו להוסיף סמלים, איורים או ציטוטים אהובים. הצוות שלנו מסייע בעיצוב ומלווה אתכם עד להקמה הסופית.',
  },
  {
    icon: '🚖',
    title: 'הסעות במונית',
    description:
      'אנו מבינים שהדרך עד לחווה אינה פשוטה ברגעים אלו. לכן אנו מספקים שירות הסעה במונית מהבית עד לחווה, בליווי דיסקרטי ורגיש. השירות מתואם מראש, מותאם לצרכים שלכם, ומאפשר לכם להתמקד במה שחשוב באמת — בפרידה.',
  },
  {
    icon: '🌷',
    title: 'פינת מבקרים',
    description:
      'בחווה ישנה פינת מבקרים שקטה ומטופחת, אליה תוכלו להגיע בכל עת לאחר תיאום טלפוני. זהו מקום שיועד למחשבה, לזכרון ולמרגוע. ניתן להביא פרחים, להדליק נר, ולשהות במקום ככל שתרצו. דניאל מתגורר בחווה ויקבל אתכם אישית.',
  },
  {
    icon: '🛡️',
    title: 'שמירה ואחזקה שוטפת',
    description:
      'אנו מקדישים תשומת לב יומיומית לתחזוקת החלקות, ניקיון, גינון, השקיה וטיפוח המצבות. דניאל מתגורר בחווה ונמצא שם תמיד עבורכם — אתם יכולים להיות שקטים שמקום המנוחה של חיית המחמד שלכם נשמר בכבוד לאורך השנים.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        emoji="🌿"
        title="השירותים שלנו"
        subtitle="מגוון שירותים מקצועיים תחת קורת גג אחת — בליווי אישי, מסור ומכובד מהרגע הראשון."
      />

      <section className="section-padding" aria-label="פירוט השירותים">
        <div className="container-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-padding bg-primary-light/40"
        aria-labelledby="how-it-works"
      >
        <div className="container-content max-w-4xl">
          <h2 id="how-it-works" className="heading-lg text-center mb-12">
            איך זה עובד?
          </h2>
          <ol className="space-y-6">
            {[
              {
                num: '1',
                title: 'יצירת קשר ראשונית',
                desc: 'התקשרו או שלחו ווטסאפ. נענה במהירות, בסבלנות ונבין יחד מה הצורך שלכם.',
              },
              {
                num: '2',
                title: 'תיאום הגעה ובחירת השירות',
                desc: 'נתאם הגעה לחווה, או שירות הסעה אם נדרש. נסקור יחד את החלקות והאפשרויות.',
              },
              {
                num: '3',
                title: 'הטקס והפרידה',
                desc: 'נלווה אתכם בטקס פרידה אישי ומכובד, בקצב שלכם ובאופן המתאים לכם.',
              },
              {
                num: '4',
                title: 'הקמת מצבה (במידת הרצון)',
                desc: 'אם בחרתם מצבה, נעצב יחד את הטקסט והתמונה, ונקים אותה תוך זמן קצר.',
              },
              {
                num: '5',
                title: 'ליווי לאורך השנים',
                desc: 'תוכלו לבקר בכל עת בתיאום, ואנו דואגים לתחזוקה השוטפת של המקום.',
              },
            ].map((step) => (
              <li key={step.num} className="flex gap-5 items-start">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shadow-soft"
                  aria-hidden="true"
                >
                  {step.num}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-dark mb-1">
                    {step.title}
                  </h3>
                  <p className="text-text/80 leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        title="יש לכם שאלה? אנחנו כאן"
        description="כל שירות מותאם אישית — אין שני מקרים זהים. צרו קשר ונחשוב יחד מה הכי נכון לכם."
      />
    </>
  );
}
