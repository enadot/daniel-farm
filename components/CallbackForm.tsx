'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type Props = {
  title?: string;
  description?: string;
};

const areaKeys = [
  'telAviv',
  'sharon',
  'shfela',
  'jerusalem',
  'haifa',
  'south',
  'other',
] as const;

export default function CallbackForm({ title, description }: Props) {
  const t = useTranslations('callback');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [consent, setConsent] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg('');

    if (!consent) {
      setErrorMsg(t('errorConsent'));
      setStatus('error');
      return;
    }

    setStatus('submitting');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
        setConsent(false);
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json?.error || t('errorGeneric'));
        setStatus('error');
      }
    } catch {
      setErrorMsg(t('errorNetwork'));
      setStatus('error');
    }
  }

  return (
    <section
      className="section-padding bg-primary-light/40"
      aria-labelledby="callback-title"
    >
      <div className="container-content max-w-3xl">
        <div className="bg-white rounded-card shadow-soft p-8 md:p-10">
          <div className="text-center mb-8">
            <span
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white text-2xl mb-3"
              aria-hidden="true"
            >
              🐾
            </span>
            <h2 id="callback-title" className="heading-md mb-3 leading-snug">
              {title ?? t('title')}
            </h2>
            <p className="text-text/80 leading-relaxed">
              {description ?? t('description')}
            </p>
          </div>

          {status === 'success' ? (
            <div
              className="card border-s-4 border-primary text-center"
              role="status"
              aria-live="polite"
            >
              <span className="text-3xl block mb-2" aria-hidden="true">
                ✓
              </span>
              <h3 className="text-lg font-bold text-primary-dark mb-2">
                {t('successTitle')}
              </h3>
              <p className="text-text/80 leading-relaxed">{t('successDesc')}</p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              aria-label={t('ariaLabel')}
              noValidate
            >
              <div className="md:col-span-1">
                <label
                  htmlFor="cb-name"
                  className="block text-sm font-medium mb-2"
                >
                  {t('name')}{' '}
                  <span className="text-red-600" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="cb-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={t('namePlaceholder')}
                  className="w-full px-4 py-3 rounded-soft border border-primary-light bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
              </div>
              <div className="md:col-span-1">
                <label
                  htmlFor="cb-phone"
                  className="block text-sm font-medium mb-2"
                >
                  {t('phone')}{' '}
                  <span className="text-red-600" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="cb-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder={t('phonePlaceholder')}
                  className="w-full px-4 py-3 rounded-soft border border-primary-light bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="cb-area"
                  className="block text-sm font-medium mb-2"
                >
                  {t('area')}
                </label>
                <select
                  id="cb-area"
                  name="area"
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-soft border border-primary-light bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                >
                  <option value="" disabled>
                    {t('areas.select')}
                  </option>
                  {areaKeys.map((key) => (
                    <option key={key} value={key}>
                      {t(`areas.${key}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 flex items-start gap-3 mt-1">
                <input
                  id="cb-consent"
                  name="consent"
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-primary rounded border-primary-light"
                />
                <label
                  htmlFor="cb-consent"
                  className="text-sm text-text/85 leading-relaxed select-none"
                >
                  {t('consent')}
                </label>
              </div>

              {status === 'error' && (
                <div
                  className="md:col-span-2 bg-red-50 border border-red-200 text-red-800 rounded-soft p-3 text-sm"
                  role="alert"
                >
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="md:col-span-2 btn-primary w-full !py-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? t('submitting') : t('submit')}
              </button>
              <p className="md:col-span-2 text-xs text-text/60 leading-relaxed text-center">
                {t('consentNote')}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
