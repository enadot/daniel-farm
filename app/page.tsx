import Link from 'next/link';
import type { Metadata } from 'next';
import TrustBar from '@/components/TrustBar';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'חוות דניאל — מנוחת החיות | בית קברות לחיות מחמד מאז 1973',
  description:
    'בית הקברות הראשון לחיות מחמד בישראל, פועל מאז 1973 ליד תל השומר. קבורה, קרמטוריום ומצבות בכבוד ובאהבה. צרו קשר: 052-3288557.',
};

const homeServices = [
  {
    icon: '🌿',
    title: 'קבורה בחלקה',
    description:
      'מקום מנוחה אחרון בחלקה לבחירתכם, מתוחזקת ומטופחת לאורך כל השנה. ליווי מלא מרגע הפנייה ועד לטקס.',
  },
  {
    icon: '🕯️',
    title: 'שירותי קרמטוריום',
    description:
      'תהליך מכובד ומקצועי לחיית המחמד שלכם, עם אפשרות לקבל את האפר באורן אישית או לפזרו בחווה.',
  },
  {
    icon: '🪨',
    title: 'הקמת מצבה אישית',
    description:
      'מצבות מותאמות אישית עם חריטה, תמונה וטקסט לבחירתכם. אפשרויות מגוונות בשיש, גרניט ועוד.',
  },
  {
    icon: '🚖',
    title: 'הסעות במונית',
    description:
      'שירות הסעה מהבית עד לחווה, בליווי דיסקרטי ורגיש. הקלה גדולה ברגעים לא קלים.',
  },
];

const sections = [
  {
    title: 'חלקת עמודי שיש',
    description: 'חלקה מכובדת ושקטה עם מצבות שיש לבן.',
    emoji: '🏛️',
  },
  {
    title: 'חלקת פרחי משי',
    description: 'אווירה צבעונית ופורחת לאורך כל השנה.',
    emoji: '🌸',
  },
  {
    title: 'חלקה מגוננת',
    description: 'בין עצים גבוהים, צל וירוק טבעי.',
    emoji: '🌳',
  },
  {
    title: 'חלקת גדולי האומה',
    description: 'חלקת היוקרה — מקום מיוחד ומכובד.',
    emoji: '⭐',
  },
];

export default function HomePage() {
  return (
    <>
      <section
        className="relative min-h-[600px] md:min-h-[680px] flex items-center text-white overflow-hidden"
        aria-labelledby="home-hero-title"
      >
        <div
          className="absolute inset-0 bg-gradient-to-bl from-[#0a3a30] via-primary-dark to-[#062a23]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-25"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 25% 30%, rgba(93, 202, 165, 0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(225, 245, 238, 0.25) 0%, transparent 55%), repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 12px)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg/30 to-transparent"
          aria-hidden="true"
        />
        <div className="relative container-content py-20 text-center md:text-right">
          <p className="inline-block bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm md:text-base text-primary-light mb-6 border border-white/15">
            <span aria-hidden="true">✦ </span>
            פועל ברציפות מאז 1973 — הראשון מסוגו בישראל
          </p>
          <h1
            id="home-hero-title"
            className="heading-xl text-white mb-6 max-w-3xl"
          >
            מנוחת החיות —<br />
            <span className="text-accent">כי כל חיה ראויה לפרידה ראויה</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-light/95 max-w-2xl mb-10 leading-relaxed">
            בית קברות לחיות מחמד ראשון מסוגו בישראל, פועל מאז 1973 מתוך אהבה
            לבעלי חיים. אנו מלווים אתכם בכבוד, ברגישות ובדיסקרטיות מלאה.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/contact"
              className="btn-whatsapp text-lg !py-4 !px-8"
              aria-label="צור קשר עכשיו"
            >
              <span aria-hidden="true">💬</span>
              צור קשר עכשיו
            </Link>
            <Link
              href="/services"
              className="btn-secondary text-lg !py-4 !px-8 !bg-white/10 !text-white !border-white/30 hover:!bg-white/20"
            >
              גלו את שירותינו
            </Link>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="section-padding" aria-labelledby="services-title">
        <div className="container-content">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 id="services-title" className="heading-lg mb-4">
              השירותים שלנו
            </h2>
            <p className="text-lg text-text/80 leading-relaxed">
              מגוון שירותים מקצועיים תחת קורת גג אחת, בליווי אישי ומסור
              לאורך כל הדרך.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeServices.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-primary">
              לכל השירותים
              <span aria-hidden="true">←</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="section-padding bg-primary-light/40"
        aria-labelledby="why-us-title"
      >
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="why-us-title" className="heading-lg mb-6">
                למה לבחור בחוות דניאל?
              </h2>
              <div className="space-y-5 text-text/85 leading-relaxed text-lg">
                <p>
                  במשך יותר מחמישה עשורים, חוות דניאל מהווה בית של ממש
                  למשפחות שאיבדו חיית מחמד אהובה. הקמנו את המקום הזה ב-1973
                  מתוך הבנה עמוקה — חיית המחמד אינה רק "חיה". היא חברה,
                  בת משפחה, ולעיתים קרובות החבר הכי קרוב שהיה לנו.
                </p>
                <p>
                  אנו מאמינים שלפרידה ראויה יש משמעות עצומה בתהליך האבל
                  והריפוי. לכן אנו מציעים מקום שקט, מטופח ומכובד, בו תוכלו
                  לבוא בכל עת ולהיזכר באהבה.
                </p>
                <p>
                  <strong className="text-primary-dark">
                    דניאל מתגורר בחווה
                  </strong>{' '}
                  — מה שמבטיח השגחה אישית, דיוק בפרטים, וטיפוח רציף של
                  המקום ושל המצבות. זה לא עסק — זה ייעוד.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '50+', label: 'שנות פעילות' },
                { num: '1973', label: 'שנת ייסוד' },
                { num: '24/7', label: 'השגחה צמודה' },
                { num: '100%', label: 'יחס אישי' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-card shadow-soft p-6 text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.num}
                  </div>
                  <div className="text-sm text-text/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="sections-title">
        <div className="container-content">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 id="sections-title" className="heading-lg mb-4">
              4 החלקות שלנו
            </h2>
            <p className="text-lg text-text/80 leading-relaxed">
              כל חלקה תוכננה בקפידה, עם אופי ואווירה משלה — כדי שתוכלו
              לבחור את המקום שמתאים בדיוק לזכר חיית המחמד שלכם.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section) => (
              <article key={section.title} className="card text-center">
                <div
                  className="w-20 h-20 mx-auto rounded-full bg-primary-light flex items-center justify-center text-4xl mb-4"
                  aria-hidden="true"
                >
                  {section.emoji}
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-3">
                  {section.title}
                </h3>
                <p className="text-text/80 leading-relaxed">
                  {section.description}
                </p>
              </article>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/sections" className="btn-primary">
              למידע מפורט על החלקות
              <span aria-hidden="true">←</span>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
