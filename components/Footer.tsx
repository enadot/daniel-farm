import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tSite = useTranslations('site');

  return (
    <footer
      className="bg-primary-dark text-white mt-20"
      role="contentinfo"
      aria-label={t('aria')}
    >
      <div className="container-content py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img
              src="/images/logo.png"
              alt={tSite('fullName')}
              width={1983}
              height={254}
              className="h-10 w-auto max-w-none object-contain mb-4 bg-white/90 rounded-soft p-2"
            />
            <p className="text-primary-light/90 text-sm leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4 text-white">
              {t('navHeading')}
            </h2>
            <ul className="space-y-2 text-primary-light/90 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white">
                  {tNav('services')}
                </Link>
              </li>
              <li>
                <Link href="/sections" className="hover:text-white">
                  {tNav('sections')}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white">
                  {tNav('gallery')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4 text-white">
              {t('contactHeading')}
            </h2>
            <ul className="space-y-3 text-primary-light/90 text-sm">
              <li className="flex items-start gap-2">
                <span aria-hidden="true">📞</span>
                <a
                  href="tel:0523288557"
                  className="hover:text-white"
                  aria-label={t('callAria')}
                  dir="ltr"
                >
                  052-3288557
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">💬</span>
                <a
                  href="https://wa.me/9720523288557"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                  aria-label={t('whatsappAria')}
                >
                  {t('whatsappLink')}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">📍</span>
                <span>{t('location')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">🕐</span>
                <span>{t('visits')}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4 text-white">
              {t('moreHeading')}
            </h2>
            <ul className="space-y-2 text-primary-light/90 text-sm">
              <li>
                <Link href="/accessibility" className="hover:text-white">
                  {t('accessibility')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  {t('story')}
                </Link>
              </li>
            </ul>
            <p className="mt-6 text-primary-light/70 text-xs leading-relaxed">
              {t('owner')}
              <br />
              {t('availability')}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-primary-light/70 text-sm">
          <p>{t('copyright', { year })}</p>
          <p className="mt-1 text-xs">{t('since')}</p>
        </div>
      </div>
    </footer>
  );
}
