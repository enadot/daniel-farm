'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const placeholders = [
  { title: 'חלקת עמודי שיש', emoji: '🏛️', tone: 'from-[#0a3a30] to-[#085041]' },
  { title: 'חלקת פרחי משי', emoji: '🌸', tone: 'from-[#1D9E75] to-[#5DCAA5]' },
  { title: 'חלקה מגוננת', emoji: '🌳', tone: 'from-[#085041] to-[#1D9E75]' },
  { title: 'חלקת גדולי האומה', emoji: '⭐', tone: 'from-[#0a3a30] to-[#1D9E75]' },
  { title: 'פינת מבקרים', emoji: '🌷', tone: 'from-[#1D9E75] to-[#085041]' },
  { title: 'נוף החווה', emoji: '🍃', tone: 'from-[#5DCAA5] to-[#1D9E75]' },
  { title: 'דרך הכניסה', emoji: '🛤️', tone: 'from-[#085041] to-[#5DCAA5]' },
  { title: 'אזור הטקס', emoji: '🕯️', tone: 'from-[#0a3a30] to-[#1D9E75]' },
  { title: 'גני זיכרון', emoji: '🌿', tone: 'from-[#1D9E75] to-[#085041]' },
];

const placeholderSvg = (label: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='%230a3a30'/>
          <stop offset='100%' stop-color='%231D9E75'/>
        </linearGradient>
      </defs>
      <rect width='1200' height='800' fill='url(%23g)'/>
      <text x='600' y='420' font-family='sans-serif' font-size='48' fill='%23E1F5EE' text-anchor='middle' direction='rtl'>${label}</text>
      <text x='600' y='480' font-family='sans-serif' font-size='28' fill='%23E1F5EE' opacity='0.8' text-anchor='middle' direction='rtl'>תמונה תועלה בקרוב</text>
    </svg>`
  )}`;

export default function GalleryGrid() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = placeholders.map((p) => ({
    src: placeholderSvg(p.title),
    alt: p.title,
    title: p.title,
  }));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {placeholders.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className={`group relative aspect-[4/3] rounded-card overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary/30 bg-gradient-to-br ${item.tone}`}
            aria-label={`הגדל תמונה: ${item.title}`}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <span className="text-6xl md:text-7xl mb-3" aria-hidden="true">
                {item.emoji}
              </span>
              <span className="text-lg md:text-xl font-bold text-center">
                {item.title}
              </span>
              <span className="text-sm text-primary-light/80 mt-1">
                תמונה תועלה בקרוב
              </span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 text-primary-dark px-4 py-2 rounded-soft font-medium"
                aria-hidden="true"
              >
                הצג תמונה
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
