'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/services', key: 'services' },
  { href: '/sections', key: 'sections' },
  { href: '/gallery', key: 'gallery' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const;

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const tSite = useTranslations('site');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? 'shadow-soft' : ''
      }`}
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-soft focus:z-50"
      >
        {t('skipToContent')}
      </a>
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-20 gap-2">
          <Link
            href="/"
            className="flex items-center flex-shrink-0"
            aria-label={t('homeAriaLabel')}
          >
            <img
              src="/images/logo.png"
              alt={tSite('fullName')}
              width={1983}
              height={254}
              className="h-10 md:h-12 w-auto max-w-none object-contain"
            />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label={t('mainMenu')}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-soft text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-light text-primary-dark'
                      : 'text-text hover:bg-primary-light/60 hover:text-primary-dark'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <a
              href="tel:0523288557"
              className="hidden lg:inline-flex btn-primary !py-2 !px-4 text-sm"
              aria-label={t('callAriaLabel')}
            >
              <span aria-hidden="true">📞</span>
              <span>{tCommon('phone')}</span>
            </a>

            <button
              type="button"
              className="lg:hidden p-2 rounded-soft text-primary-dark hover:bg-primary-light"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? t('closeMenu') : t('openMenu')}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <nav
            id="mobile-menu"
            className="lg:hidden py-4 border-t border-primary-light"
            role="navigation"
            aria-label={t('mobileMenu')}
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 rounded-soft text-base font-medium ${
                        isActive
                          ? 'bg-primary-light text-primary-dark'
                          : 'text-text hover:bg-primary-light/60'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <a
                  href="tel:0523288557"
                  className="btn-primary w-full"
                  aria-label={t('callAriaLabel')}
                >
                  <span aria-hidden="true">📞</span>
                  <span>{tCommon('phone')}</span>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

