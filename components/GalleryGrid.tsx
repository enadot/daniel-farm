'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const photoKeys = ['p1', 'p2', 'p3', 'p4', 'p5'] as const;
const photoSources: Record<(typeof photoKeys)[number], string> = {
  p1: '/images/gallery/photo-1.jpg',
  p2: '/images/gallery/photo-2.jpg',
  p3: '/images/gallery/photo-3.jpg',
  p4: '/images/gallery/photo-4.jpg',
  p5: '/images/gallery/photo-5.jpg',
};

export default function GalleryGrid() {
  const t = useTranslations('gallery.photos');
  const tCommon = useTranslations('common');
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const photos = photoKeys.map((key) => ({
    src: photoSources[key],
    title: t(`${key}.title`),
    description: t(`${key}.description`),
  }));

  const slides = photos.map((p) => ({
    src: p.src,
    alt: p.title,
    title: p.title,
    description: p.description,
  }));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {photos.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="group relative aspect-[4/3] rounded-card overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary/30 bg-primary-dark"
            aria-label={tCommon('enlargeImage', { title: item.title })}
          >
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/75 via-black/40 to-transparent text-white"
              aria-hidden="true"
            >
              <span className="text-lg md:text-xl font-bold drop-shadow">
                {item.title}
              </span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 text-primary-dark px-4 py-2 rounded-soft font-medium"
                aria-hidden="true"
              >
                {tCommon('viewImage')}
              </span>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </>
  );
}
