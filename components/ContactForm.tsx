'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/yourFormId';

export default function ContactForm() {
  const t = useTranslations('contact.form');
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
        setErrorMsg(json?.error || t('errorGeneric'));
        setStatus('error');
      }
    } catch {
      setErrorMsg(t('errorNetwork'));
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        className="card border-s-4 border-primary"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <span className="text-3xl" aria-hidden="true">
            ✓
          </span>
          <div>
            <h3 className="text-xl font-bold text-primary-dark mb-2">
              {t('successTitle')}
            </h3>
            <p className="text-text/80 leading-relaxed">{t('successDesc')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card space-y-5"
      aria-label={t('ariaLabel')}
      noValidate
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          {t('name')}{' '}
          <span className="text-red-600" aria-hidden="true">
            *
          </span>
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
          {t('phone')}{' '}
          <span className="text-red-600" aria-hidden="true">
            *
          </span>
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
          {t('petType')}
        </label>
        <select
          id="pet-type"
          name="pet-type"
          defaultValue=""
          className="w-full px-4 py-3 rounded-soft border border-primary-light bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
        >
          <option value="" disabled>
            {t('petOptions.select')}
          </option>
          <option value="dog">{t('petOptions.dog')}</option>
          <option value="cat">{t('petOptions.cat')}</option>
          <option value="rabbit">{t('petOptions.rabbit')}</option>
          <option value="bird">{t('petOptions.bird')}</option>
          <option value="reptile">{t('petOptions.reptile')}</option>
          <option value="rodent">{t('petOptions.rodent')}</option>
          <option value="other">{t('petOptions.other')}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-4 py-3 rounded-soft border border-primary-light bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-y"
          placeholder={t('messagePlaceholder')}
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
        {status === 'submitting' ? t('submitting') : t('submit')}
      </button>

      <p className="text-xs text-text/60 leading-relaxed">{t('consent')}</p>
    </form>
  );
}
