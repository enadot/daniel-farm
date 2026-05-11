import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import GalleryGrid from '@/components/GalleryGrid';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'גלריה — תמונות מחוות דניאל',
  description:
    'גלריית תמונות מחוות דניאל — החלקות, המצבות, הטבע והאווירה. הצצה למקום השקט והמכובד בו אנו מלווים אתכם.',
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        emoji="📸"
        title="גלריה"
        subtitle="הצצה למקום — החלקות, הטבע, והאווירה השקטה והמכובדת של חוות דניאל."
      />

      <section className="section-padding" aria-label="גלריית תמונות">
        <div className="container-content">
          <p className="text-center text-text/75 mb-10 max-w-2xl mx-auto leading-relaxed">
            הצצה אמיתית לחווה — מצבות, חלקות והאווירה הירוקה והשקטה.
            לחצו על כל תמונה להגדלה. תוכלו גם לתאם ביקור אישי
            ולראות את המקום במו עיניכם.
          </p>
          <GalleryGrid />
        </div>
      </section>

      <CTASection
        title="רוצים לראות את המקום בעצמכם?"
        description="תאמו ביקור בתיאום טלפוני, ונשמח להראות לכם את החווה אישית."
      />
    </>
  );
}
