# חוות דניאל — מנוחת החיות

אתר רב-דפי לבית הקברות הראשון בישראל לחיות מחמד. בנוי ב-Next.js 14 (App Router) + TypeScript + Tailwind CSS, RTL מלא בעברית.

## הרצה מקומית

```bash
npm install
npm run dev
```

האתר יעלה ב-`http://localhost:3000`.

## בנייה לפרודקשן

```bash
npm run build
npm start
```

## מבנה

```
chavat-daniel/
├── app/
│   ├── layout.tsx            # root layout עם Heebo font ו-RTL
│   ├── page.tsx              # /
│   ├── globals.css
│   ├── not-found.tsx
│   ├── services/page.tsx     # /services
│   ├── sections/page.tsx     # /sections
│   ├── gallery/page.tsx      # /gallery
│   ├── about/page.tsx        # /about
│   ├── contact/page.tsx      # /contact
│   └── accessibility/page.tsx
├── components/
│   ├── Header.tsx            # navigation עם hamburger במובייל
│   ├── Footer.tsx
│   ├── WhatsAppButton.tsx    # float button
│   ├── PageHero.tsx
│   ├── TrustBar.tsx
│   ├── ServiceCard.tsx
│   ├── SectionCard.tsx
│   ├── CTASection.tsx
│   ├── ContactForm.tsx       # Formspree integration
│   └── GalleryGrid.tsx       # yet-another-react-lightbox
├── tailwind.config.ts        # custom colors (primary, accent, bg, text)
├── next.config.js
└── tsconfig.json
```

## הגדרת טופס יצירת קשר

הטופס משתמש ב-[Formspree](https://formspree.io). הגדירו endpoint משלכם:

צרו קובץ `.env.local`:

```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

## פרטי קשר העסק

- **שם**: חוות דניאל — מנוחת החיות
- **בעלים**: דניאל שאול
- **טלפון/ווטסאפ**: 052-3288557
- **מיקום**: ליד תל השומר, גוש דן
- **נוסד**: 1973

## נגישות

האתר נבנה בהתאם לתקן WCAG 2.1 ברמה AA: ניווט מקלדת מלא, aria-labels בעברית, alt לכל התמונות, ניגודיות צבעים גבוהה, רספונסיבי, וקישור "דלג לתוכן הראשי".
