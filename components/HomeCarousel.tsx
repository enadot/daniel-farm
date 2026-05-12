'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const photoKeys = ['p1', 'p2', 'p3', 'p4', 'p5'] as const;
const photoSources: Record<(typeof photoKeys)[number], string> = {
  p1: '/images/gallery/photo-1.jpg',
  p2: '/images/gallery/photo-2.jpg',
  p3: '/images/gallery/photo-3.jpg',
  p4: '/images/gallery/photo-4.jpg',
  p5: '/images/gallery/photo-5.jpg',
};

export default function HomeCarousel() {
  const t = useTranslations('gallery');
  const tPhotos = useTranslations('gallery.photos');
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  function updateButtons() {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const x = Math.abs(el.scrollLeft);
    setCanScrollPrev(x > 4);
    setCanScrollNext(x < max - 4);
  }

  useEffect(() => {
    updateButtons();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    return () => {
      el.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  }, []);

  function scroll(direction: 'prev' | 'next') {
    const el = scrollerRef.current;
    if (!el) return;
    const isRtl = getComputedStyle(el).direction === 'rtl';
    const amount = el.clientWidth * 0.8;
    const sign = direction === 'next' ? 1 : -1;
    el.scrollBy({ left: sign * amount * (isRtl ? -1 : 1), behavior: 'smooth' });
  }

  return (
    <section
      className="section-padding"
      aria-labelledby="home-carousel-title"
    >
      <div className="container-content">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 id="home-carousel-title" className="heading-lg mb-4">
            {t('hero.title')}
          </h2>
          <p className="text-lg text-text/80 leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 [scrollbar-width:thin]"
            tabIndex={0}
            aria-label={t('aria')}
          >
            {photoKeys.map((key) => (
              <Link
                key={key}
                href="/gallery"
                className="group relative snap-start flex-shrink-0 w-[80%] xs:w-[70%] sm:w-[48%] md:w-[38%] lg:w-[30%] aspect-[4/3] rounded-card overflow-hidden shadow-soft hover:shadow-soft-lg transition-shadow"
                aria-label={tPhotos(`${key}.title`)}
              >
                <img
                  src={photoSources[key]}
                  alt={tPhotos(`${key}.title`)}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/75 via-black/30 to-transparent text-white"
                  aria-hidden="true"
                >
                  <span className="text-base md:text-lg font-bold drop-shadow">
                    {tPhotos(`${key}.title`)}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll('prev')}
            disabled={!canScrollPrev}
            aria-label={t('aria') + ' — prev'}
            className="hidden md:flex absolute start-0 top-1/2 -translate-y-1/2 -translate-x-0 z-10 w-11 h-11 items-center justify-center rounded-full bg-white shadow-soft text-primary-dark hover:bg-primary-light disabled:opacity-0 disabled:pointer-events-none transition-opacity"
          >
            <svg
              className="w-5 h-5 rtl:rotate-180"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll('next')}
            disabled={!canScrollNext}
            aria-label={t('aria') + ' — next'}
            className="hidden md:flex absolute end-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white shadow-soft text-primary-dark hover:bg-primary-light disabled:opacity-0 disabled:pointer-events-none transition-opacity"
          >
            <svg
              className="w-5 h-5 rtl:rotate-180"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="text-center mt-10">
          <Link href="/gallery" className="btn-primary">
            {t('ctaTitle')}
            <span aria-hidden="true">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
