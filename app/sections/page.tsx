import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import SectionCard from '@/components/SectionCard';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'חלקות הקבורה — 4 חלקות לבחירה בחוות דניאל',
  description:
    'בחוות דניאל ארבע חלקות קבורה ייחודיות לחיות מחמד: עמודי שיש, פרחי משי, חלקה מגוננת וחלקת גדולי האומה. בחרו את האווירה המתאימה לכם.',
};

const sections = [
  {
    title: 'חלקת עמודי שיש',
    atmosphere: 'מכובדת · קלאסית · נצחית',
    emoji: '🏛️',
    description:
      'חלקה אלגנטית עם מצבות שיש לבן בולטות, המעניקות מראה מכובד וקלאסי. החלקה מתוחזקת בקפידה, עם שבילים מעוצבים ופינות ישיבה שקטות. מתאימה למי שמחפש מקום מנוחה מסורתי, מכובד ובעל נוכחות.',
    features: [
      'מצבת שיש לבן איכותי',
      'חריטה אישית של שם, תאריכים וטקסט',
      'אפשרות להוספת תמונה חרוטה',
      'שבילים מעוצבים וגישה נוחה',
      'תחזוקה שוטפת של המצבה והחלקה',
    ],
  },
  {
    title: 'חלקת פרחי משי',
    atmosphere: 'צבעונית · חיה · אופטימית',
    emoji: '🌸',
    description:
      'חלקה ייחודית בה כל מצבה מעוטרת בפרחי משי צבעוניים שאינם נובלים. האווירה אופטימית ופורחת לאורך כל השנה — תזכורת מתמדת לאהבה ולחיים. מתאים למי שמעדיף לזכור את החיה האהובה דרך שמחה וצבעים, ולא דרך אבל.',
    features: [
      'מצבה עם עיצוב פרחי משי קבוע',
      'בחירת צבעים ושילובים אישית',
      'מראה צבעוני לאורך כל השנה',
      'חידוש פרחים ע"י הצוות',
      'חריטה אישית של פרטי החיה',
    ],
  },
  {
    title: 'חלקה מגוננת',
    atmosphere: 'טבעית · מוצלת · רוגעת',
    emoji: '🌳',
    description:
      'חלקה הממוקמת תחת עצים גבוהים ומבוגרים, עם צל טבעי, ירוק שופע ואווירה כמעט יערית. המקום שקט במיוחד, וניתן לשמוע ציפורים בכל עת. מתאים למי שאהב את הטבע, את הטיולים, ואת החיים החיצוניים — כלבים ובעלי חיים שאהבו את הירוק.',
    features: [
      'מיקום מוצל בין עצים מבוגרים',
      'צמחיה טבעית סביב המצבה',
      'מצבה משולבת בנוף הירוק',
      'פינות ישיבה טבעיות',
      'סביבה שקטה במיוחד',
    ],
  },
  {
    title: 'חלקת גדולי האומה',
    atmosphere: 'יוקרתית · מיוחדת · מובחרת',
    emoji: '⭐',
    description:
      'חלקת היוקרה של החווה — מקום מובחר השמור לחיות מחמד שתפסו מקום מיוחד בלב המשפחה. החלקה גדולה יותר, עם מצבות מהודרות יותר, מיקום מרכזי ופרטיות מוגברת. כל פרט בחלקה מעוצב בקפידה כדי להעניק את הכבוד האולטימטיבי.',
    features: [
      'חלקה רחבה עם פרטיות מוגברת',
      'מצבה מהודרת ויוקרתית',
      'אפשרויות עיצוב מותאמות אישית',
      'מיקום מרכזי ובולט',
      'תחזוקה ברמה הגבוהה ביותר',
    ],
  },
];

export default function SectionsPage() {
  return (
    <>
      <PageHero
        emoji="🌿"
        title="חלקות הקבורה"
        subtitle="ארבע חלקות, ארבע אווירות. כל אחת תוכננה במחשבה — כדי שתוכלו לבחור את המקום המושלם לזכר חיית המחמד שלכם."
      />

      <section className="section-padding" aria-label="פירוט החלקות">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sections.map((section) => (
              <SectionCard key={section.title} {...section} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-padding bg-primary-light/40"
        aria-labelledby="choice-title"
      >
        <div className="container-content max-w-3xl text-center">
          <h2 id="choice-title" className="heading-lg mb-6">
            לא בטוחים איזו חלקה לבחור?
          </h2>
          <p className="text-lg text-text/85 leading-relaxed mb-8">
            זה בסדר — זו החלטה אישית מאוד, ואין תשובה נכונה אחת. אנחנו מזמינים
            אתכם להגיע לחווה (בתיאום מראש), להתרשם מהמקום, וללוות אתכם בבחירה
            המתאימה. ניתן גם להתייעץ איתנו טלפונית, ונדאג להציג לכם את
            האפשרויות תוך התחשבות בצרכים ובתקציב שלכם.
          </p>
          <a
            href="https://wa.me/9720523288557"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-lg !py-4 !px-8"
          >
            <span aria-hidden="true">💬</span>
            דברו איתנו בווטסאפ
          </a>
        </div>
      </section>

      <CTASection />
    </>
  );
}
