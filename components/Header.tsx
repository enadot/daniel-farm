'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'דף הבית' },
  { href: '/services', label: 'השירותים שלנו' },
  { href: '/sections', label: 'חלקות הקבורה' },
  { href: '/gallery', label: 'גלריה' },
  { href: '/about', label: 'אודות' },
  { href: '/contact', label: 'צור קשר' },
];

export default function Header() {
  const pathname = usePathname();
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
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-soft focus:z-50"
      >
        דלג לתוכן הראשי
      </a>
      <div className="container-content">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary-dark"
            aria-label="חוות דניאל - דף הבית"
          >
            <span className="text-3xl" aria-hidden="true">🌿</span>
            <span>מנוחת החיות</span>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="תפריט ראשי"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-soft text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-light text-primary-dark'
                      : 'text-text hover:bg-primary-light/60 hover:text-primary-dark'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <a
            href="tel:0523288557"
            className="hidden lg:inline-flex btn-primary !py-2 !px-4 text-sm"
            aria-label="התקשרו אלינו: 052-3288557"
          >
            <span aria-hidden="true">📞</span>
            <span>052-3288557</span>
          </a>

          <button
            type="button"
            className="lg:hidden p-2 rounded-soft text-primary-dark hover:bg-primary-light"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
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

        {isOpen && (
          <nav
            id="mobile-menu"
            className="lg:hidden py-4 border-t border-primary-light"
            role="navigation"
            aria-label="תפריט נייד"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 rounded-soft text-base font-medium ${
                        isActive
                          ? 'bg-primary-light text-primary-dark'
                          : 'text-text hover:bg-primary-light/60'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <a
                  href="tel:0523288557"
                  className="btn-primary w-full"
                  aria-label="התקשרו: 052-3288557"
                >
                  <span aria-hidden="true">📞</span>
                  <span>052-3288557</span>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
