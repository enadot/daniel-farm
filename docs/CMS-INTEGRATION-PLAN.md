# Builder.io — מדריך עריכת האתר

האתר מחובר לחשבון Builder.io שלך. אפשר לערוך כל עמוד, להוסיף קומפוננטות drag-and-drop, להחליף תמונות וטקסטים, ולקבוע צבעים — בלי לגעת בקוד.

## חיבור ראשון

### 1. התקנה מקומית (חד-פעמית)

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

`.env.local` כבר מכיל את ה-API Key הציבורי (`6728a5ea20e84fb486556b6399dea5b3`). אפשר גם פשוט להגדיר אותו במשתני סביבה בפלטפורמת ה-hosting (Vercel/Netlify) כ-`NEXT_PUBLIC_BUILDER_API_KEY`.

### 2. רישום Builder ל-domain שלך

ב-Builder.io: **Account → Spaces → Settings → Site URL**

הזן את כתובת האתר שלך (לדוגמה `https://chavat-daniel.co.il` או הקישור הזמני של Vercel/Netlify). זה מאפשר למצב Preview ב-Builder לטעון את האתר ב-iframe.

## איך עורכים תוכן בעמוד קיים

כל עמוד באתר כבר חשוף לעריכה:

| נתיב | URL ב-Builder |
|------|---------------|
| דף הבית | `/` |
| השירותים שלנו | `/services` |
| חלקות הקבורה | `/sections` |
| גלריה | `/gallery` |
| אודות | `/about` |
| צור קשר | `/contact` |
| הצהרת נגישות | `/accessibility` |

### יצירת תוכן בעמוד

1. ב-Builder.io, לחץ על **+ New** → בחר **Page**
2. במסך הבא:
   - **Name**: למשל "Home — Hebrew" (כדי שתזכרו מה זה)
   - **URL**: ב-Path הכנס את הנתיב מהטבלה למעלה (`/` לדף הבית)
   - **Locale**: בחר עברית, אנגלית או רוסית
3. לחץ **Create**
4. בעורך הויזואלי, גרור קומפוננטות מהפאנל הימני (Service Card, CTA Section, Photo Carousel, Callback Form, וכו')
5. ערוך טקסטים בלחיצה עליהם
6. כשמוכן — **Publish**

התוכן שתפרסם יופיע **בנוסף** לתוכן הקיים בעמוד, מתחת לכל הקטעים הקיימים ולפני ה-CTA הסופי. כך הדף שלך נראה כמו תמיד, פלוס מה שאתה מוסיף.

### דריסת עמוד שלם

אם תרצה להחליף **לגמרי** עמוד קיים: ב-Builder, ערוך את הדף שיצרת, וצור בו את כל התוכן שאתה רוצה. הקוד שלי כבר טוען את התוכן מ-Builder ומציג אותו בסוף העמוד; כדי לעשות override מלא צריך עדכון קטן בקוד — תגיד לי איזה עמודים תרצה להפוך ל"מנוהל לחלוטין ב-Builder" ואסיר את התוכן הקבוע.

## קומפוננטות זמינות בעורך

הקומפוננטות הבאות רשומות ב-Builder ועומדות לרשותך ככלי drag-and-drop:

- **Service Card** — כרטיס שירות (icon, title, description)
- **Section Card** — כרטיס חלקה (emoji, title, atmosphere, description, features)
- **Page Hero** — בלוק כותרת לעמוד (emoji, title, subtitle)
- **CTA Section** — אזור קריאה לפעולה (title, description)
- **Trust Bar** — סרגל ערכים
- **Photo Carousel** — קרוסלה אופקית של גלריה
- **Gallery Grid** — רשת גלריה עם lightbox
- **Callback Form** — טופס שיחה חוזרת (title, description ניתנים לדריסה)
- **SEO Article** — מאמר ה-SEO + FAQ

חוץ מאלה, יש גם את כל הקומפוננטות המובנות של Builder: טקסט, תמונה, וידאו, סקציה, columns, וכו'.

## ריבוי שפות (i18n)

לכל עמוד אפשר ליצור גרסה לכל אחת מ-3 השפות (he / en / ru). ב-Builder תוכל לשכפל עמוד קיים ולשנות את ה-Locale.

האתר ידע להציג את הגרסה הנכונה אוטומטית: גולש שמגיע ל-`/` יראה את גרסת ה-Hebrew, ל-`/en` את האנגלית, ל-`/ru` את הרוסית.

## טופס שיחה חוזרת — webhook ללידים

טופס "שיחה חוזרת" בדף הבית שולח את הלידים ל-webhook חיצוני (Zapier, Make, n8n, או כל מערכת לידים), והכל גם נשמר ב**לוח הבקרה שלנו** ב-`/admin`.

### דרך מומלצת: לוח הבקרה ב-`/admin`

ראה את הסעיף הבא — "לוח בקרה משלנו". הוא מאפשר לערוך את ה-webhook URL מתוך ממשק נקי שלנו, בלי תלות ב-Builder, ולראות את כל הלידים שהתקבלו בטבלה.

### דרכים חלופיות

- **משתנה סביבה ב-Vercel** (מקסימום-prioritet): הגדר `LEAD_WEBHOOK_URL=...` במשתני הסביבה. זה דורס כל מה שיוגדר בלוח הבקרה.
- **Builder Data Model** (legacy): אם יצרת בעבר Model בשם `settings` עם שדה `leadWebhookUrl` ב-Builder — הקוד עוד יקרא ממנו כ-fallback אחרון.

## לוח בקרה משלנו — `/admin`

נכנסים לכתובת: `https://YOUR_DOMAIN/admin`

### הגדרה ראשונית (חד-פעמית, ב-Vercel)

הוסף שני env vars:

```
ADMIN_PASSWORD=הסיסמה-שתבחר
ADMIN_SECRET=מחרוזת-רנדומלית-ארוכה
```

(`ADMIN_SECRET` משמש לחתימת ה-cookie של ההתחברות. אפשר לייצר אותה עם
`openssl rand -hex 32` או באתר https://generate-secret.vercel.app/32.)

### לאחסון לאורך זמן (מומלץ ב-Production): הפעל Vercel KV

בלי KV, ההגדרות והלידים יישמרו בזיכרון בלבד ויאופסו בכל deploy.
ב-Vercel:
1. הפרויקט → **Storage** → **Create Database** → **KV** (Upstash Redis)
2. לחץ **Connect Project** ובחר את הפרויקט
3. Vercel תוסיף אוטומטית את ה-env vars (`KV_URL`, `KV_REST_API_URL`, וכו')
4. **Redeploy**

### שימוש יומיומי

לאחר deploy, גשו ל-`/admin`:

- **כניסה**: הזן את ה-`ADMIN_PASSWORD` שהגדרת
- **Webhook**: עדכן את ה-URL של Zapier/Make וכפתור "שמירה". תוקף מיידי
- **Google Tag Manager**: שדה GTM-ID — הדבק את המזהה (`GTM-XXXXXXX`) וזה יוטמע בכל עמודי האתר. השאר ריק כדי לכבות
- **לידים**: טבלה של 200 הלידים האחרונים עם שם, טלפון (לחיצה = חיוג), אזור, סטטוס webhook
- **רענון**: כפתור "רענון" מעל הטבלה. הדף לא מתעדכן אוטומטית כדי לא להפריע
- **יציאה**: כפתור "יציאה" בכותרת. ה-cookie מתפוגג אחרי 30 יום

### מה Webhook אמור לקבל

```json
{
  "id": "uuid",
  "name": "ישראל ישראלי",
  "phone": "0501234567",
  "area": "telAviv",
  "source": "chavat-daniel.co.il",
  "submittedAt": "2026-05-12T10:23:00.000Z",
  "referrer": "https://chavat-daniel.co.il/",
  "userAgent": "Mozilla/5.0..."
}
```

POST + Content-Type application/json. אם ה-webhook יחזיר משהו שאינו 2xx, הליד עדיין יישמר ב-`/admin` ויסומן "לא הועבר".

מערכת הלידים תקבל JSON בפורמט:

```json
{
  "name": "ישראל ישראלי",
  "phone": "0501234567",
  "area": "telAviv",
  "source": "chavat-daniel.co.il",
  "submittedAt": "2026-05-12T10:23:00.000Z",
  "referrer": "https://chavat-daniel.co.il/",
  "userAgent": "..."
}
```

> אם לא הוגדר webhook (אף שיטה), הטופס עדיין יציג "תודה" למגיש ויירשם בלוגים של השרת — הליד לא יאבד.

## Webhook לעדכון אוטומטי של האתר אחרי Publish

כדי שכל פעם שאתה מפרסם שינוי ב-Builder, האתר יתעדכן מיד (בלי לחכות לקאש), הגדר webhook:

1. **בחר secret**: סטרינג רנדומלי, למשל מ-https://generate-secret.vercel.app/32
2. ב-Vercel/Netlify הגדר: `BUILDER_WEBHOOK_SECRET=הסטרינג-שלך`
3. ב-Builder: **Account Settings → Webhooks → Add Webhook**
   - URL: `https://chavat-daniel.co.il/api/revalidate?secret=הסטרינג-שלך`
   - Event: `content.publish`
4. שמור

עכשיו כל Publish ב-Builder יקרא ל-revalidate אצלנו ויעדכן את הקאש של Next.js.

## בעיות נפוצות

**"התוכן שיצרתי לא מופיע באתר"**
- ודא שלחצת **Publish** (לא רק Save)
- ודא שה-URL ב-Builder תואם בדיוק לנתיב באתר (כולל `/`)
- ודא שה-Locale ב-Builder תואם לשפה של הדף

**"רוצה לערוך את ההדר/פוטר"**
- אלה לא נחשפו ל-Builder ב-v1 כי הם מכילים לוגיקה (מתג שפות, נווט). אם תרצה גם אותם — תגיד לי ואחבר אותם.

## עזרה

יש שאלות נוספות? תגיד מה אתה רוצה לערוך, או שלח צילום מסך מ-Builder, ונפתור.
