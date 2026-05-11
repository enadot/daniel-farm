import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

type CTASectionProps = {
  title?: string;
  description?: string;
};

export default function CTASection({ title, description }: CTASectionProps) {
  const t = useTranslations('cta');
  const tCommon = useTranslations('common');
  const resolvedTitle = title ?? t('title');
  const resolvedDescription = description ?? t('description');

  return (
    <section
      className="section-padding bg-primary-dark text-white relative overflow-hidden"
      aria-labelledby="cta-title"
    >
      <div
        className="absolute inset-0 opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(93, 202, 165, 0.6) 0%, transparent 40%)',
        }}
      />
      <div className="relative container-content text-center">
        <h2 id="cta-title" className="heading-lg text-white mb-4">
          {resolvedTitle}
        </h2>
        <p className="text-lg text-primary-light/95 max-w-2xl mx-auto mb-8 leading-relaxed">
          {resolvedDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://wa.me/9720523288557"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-lg !py-4 !px-8"
            aria-label={t('whatsappAria')}
          >
            <span aria-hidden="true">💬</span>
            {tCommon('whatsappCta')}
          </a>
          <a
            href="tel:0523288557"
            className="btn-secondary text-lg !py-4 !px-8"
            aria-label={t('callAria')}
          >
            <span aria-hidden="true">📞</span>
            <span dir="ltr">{tCommon('phone')}</span>
          </a>
          <Link
            href="/contact"
            className="text-white underline underline-offset-4 hover:text-primary-light transition-colors"
          >
            {t('formLink')}
          </Link>
        </div>
      </div>
    </section>
  );
}
