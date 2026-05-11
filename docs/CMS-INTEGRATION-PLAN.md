# תוכנית אינטגרציה ל-CMS עם עורך Drag-and-Drop

מסמך זה מתאר כיצד לחבר את האתר ל-**Builder.io** — שירות חינמי עם עורך ויזואלי גרפי לעריכת תוכן, קומפוננטות, צבעים ועוד ללא צורך לערוך קוד.

## למה Builder.io

- **Drag-and-drop מלא** — עורך ויזואלי דמוי Figma/Webflow, גם למשתמשים לא טכניים
- **חינם** — Free tier כולל משתמש אחד, ביקורים בלתי מוגבלים, וגרסה אחת
- **תומך Next.js 14 App Router ו-i18n** — מתחבר נטיבית ל-locales שלנו (he/en/ru)
- **התחברות עם משתמש/סיסמה** — Builder מספק UI ניהול שלם, אין צורך לבנות לוח בקרה לבד
- **שליטה במה שניתן לערוך** — מגדירים אילו טקסטים/קומפוננטות מותרים בעריכה, השאר נשאר hard-coded ובטוח
- **תמיכה בקומפוננטות מותאמות** — כל קומפוננטה שכבר קיימת (ServiceCard, SectionCard וכו') יכולה להופיע ככלי בעורך

## מה ניתן יהיה לערוך דרך Builder.io

לאחר ההגדרה, מהממשק של builder.io ניתן יהיה:

- ✅ לערוך טקסטים בכל עמוד (כותרות, פסקאות, כפתורים)
- ✅ להחליף תמונות (העלאה ישירה, ללא צורך ב-deploy)
- ✅ לגרור ולשחרר קומפוננטות חדשות לעמוד (Service Card, Section Card, CTA Section וכו')
- ✅ לעדכן את צבעי המותג
- ✅ להוסיף/להסיר פריטי תפריט
- ✅ לערוך לוגו
- ✅ לעדכן תוכן בכל שפה בנפרד (he/en/ru)
- ✅ לבצע preview לפני פרסום
- ✅ לראות גרסאות קודמות ולחזור אחורה

## שלבי ההטמעה (כשהמשתמש פותח חשבון)

### שלב 1 — פתיחת חשבון

1. להירשם ב-https://builder.io/signup (חינם, ללא כרטיס אשראי)
2. ליצור Space חדש בשם "Chavat Daniel"
3. לקבל מ-Settings → API Keys את ה-**Public API Key**

### שלב 2 — התקנת SDK

```bash
npm install @builder.io/react @builder.io/sdk-react-nextjs
```

הוספה ל-`.env.local`:

```
NEXT_PUBLIC_BUILDER_API_KEY=<המפתח שהתקבל>
```

### שלב 3 — חיבור קומפוננטות הקוד הקיימות

יצירת קובץ `lib/builder-registry.ts` שירשום את הקומפוננטות הקיימות (`ServiceCard`, `SectionCard`, `CTASection`, `PageHero`, וכו') ככלים זמינים בעורך, עם הגדרת ה-props שניתנים לעריכה:

```ts
import { Builder } from '@builder.io/react';
import ServiceCard from '@/components/ServiceCard';

Builder.registerComponent(ServiceCard, {
  name: 'ServiceCard',
  inputs: [
    { name: 'icon', type: 'text', defaultValue: '🌿' },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'longText', required: true },
  ],
});
// וכן הלאה לכל קומפוננטה
```

### שלב 4 — מודל תוכן בעמוד

בעורך של Builder יוצרים Model בשם "Page" ומגדירים שדה לכל אזור שרוצים שיהיה ניתן לעריכה (Hero, Services Section, Why-us, וכו'). Builder מטפל לבד בריבוי שפות אם מסומן שהמודל "Localized".

### שלב 5 — Rendering ב-Next.js

כל עמוד (`app/[locale]/page.tsx` וכו') יקרא ל-`getContent()` של Builder ויעטוף את התוכן ב-`<BuilderComponent />`. ה-`messages/*.json` הקיים יישאר fallback למקרה שהתוכן עוד לא הועלה דרך ה-CMS.

```tsx
import { builder } from '@builder.io/sdk-react-nextjs';
import { RenderBuilderContent } from '@/components/builder';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default async function Page({ params }) {
  const content = await builder
    .get('page', { userAttributes: { urlPath: '/' }, locale: params.locale })
    .toPromise();

  return <RenderBuilderContent content={content} model="page" />;
}
```

### שלב 6 — Webhook ל-revalidation

הוספת route `/api/revalidate` שמופעל מ-Builder כשמשתמש מפרסם, כדי שהאתר יתרענן מיידית.

## מה אני צריך ממך כדי להתחיל

1. **חשבון Builder.io** פתוח (https://builder.io/signup)
2. **Public API Key** מ-Settings → API Keys
3. **החלטה אילו אזורים** באתר יהיו ניתנים לעריכה דרך CMS (ההמלצה שלי: hero, services, why-us, sections — כלומר עמוד הבית במלואו. עמודים פנימיים אפשר להשאיר מתורגמים מקובץ JSON בשלב הראשון)

ברגע שתפתח חשבון ותעביר לי את ה-API Key, אני אבצע את שלבים 2—6.

## עלות

- **כל מה שמתואר כאן — חינם**
- Free tier מספיק לאתר הזה (פחות מ-25K visits בחודש)
- אין הפתעות עתידיות: רק אם תרצה משתמשים נוספים שיוכלו לערוך, או workflow של אישור פרסום — אז יש שדרוג בתשלום

## חלופה: Sanity Studio (אם Builder.io לא מתאים)

אם תרצה משהו עם פחות "drag-and-drop" וחזק יותר במודלים של תוכן (למשל קטלוג של חלקות, מצבות לדוגמה, וכו'), הגיוני גם Sanity:

- חינם עד 3 משתמשים
- ממשק ניהול חזק (לא drag-and-drop ויזואלי)
- שליטה מלאה במודל התוכן

אבל לרוב המקרים — Builder.io עונה יותר טוב על "drag-and-drop editor שמתחברים אליו עם משתמש".
