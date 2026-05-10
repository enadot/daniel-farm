'use client';

import { useState, FormEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/yourFormId';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json?.error || 'אירעה שגיאה בשליחה. אנא נסו שוב.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('בעיה בחיבור לרשת. אנא נסו שוב או צרו קשר טלפוני.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        className="card border-r-4 border-primary"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <span className="text-3xl" aria-hidden="true">✓</span>
          <div>
            <h3 className="text-xl font-bold text-primary-dark mb-2">
              תודה רבה — קיבלנו את ההודעה שלכם
            </h3>
            <p className="text-text/80 leading-relaxed">
              נחזור אליכם בהקדם האפשרי. אם זה דחוף, אתם תמיד מוזמנים
              להתקשר ישירות ל-052-3288557 או לשלוח ווטסאפ.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card space-y-5"
      aria-label="טופס יצירת קשר"
      noValidate
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          שם מלא <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full px-4 py-3 rounded-soft border border-primary-light bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          טלפון <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          className="w-full px-4 py-3 rounded-soft border border-primary-light bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
        />
      </div>

      <div>
        <label htmlFor="pet-type" className="block text-sm font-medium mb-2">
          סוג החיה
        </label>
        <select
          id="pet-type"
          name="pet-type"
          defaultValue=""
          className="w-full px-4 py-3 rounded-soft border border-primary-light bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
        >
          <option value="" disabled>בחרו סוג חיה</option>
          <option value="כלב">כלב</option>
          <option value="חתול">חתול</option>
          <option value="ארנב">ארנב</option>
          <option value="ציפור">ציפור</option>
          <option value="זוחל">זוחל</option>
          <option value="מכרסם">מכרסם</option>
          <option value="אחר">אחר</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          הודעה
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-4 py-3 rounded-soft border border-primary-light bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-y"
          placeholder="ספרו לנו במה תוכל לסייע..."
        />
      </div>

      {status === 'error' && (
        <div
          className="bg-red-50 border border-red-200 text-red-800 rounded-soft p-3 text-sm"
          role="alert"
        >
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'שולח...' : 'שליחת הודעה'}
      </button>

      <p className="text-xs text-text/60 leading-relaxed">
        בלחיצה על "שליחת הודעה" אתם מסכימים שניצור עמכם קשר. הפרטים שלכם
        נשמרים בדיסקרטיות מלאה ולא יועברו לצד שלישי.
      </p>
    </form>
  );
}
