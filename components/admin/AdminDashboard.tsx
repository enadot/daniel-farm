'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Settings, Lead } from '@/lib/admin-storage';

type Props = {
  initialSettings: Settings;
  leads: Lead[];
  storage: { persistent: boolean; backend: 'kv' | 'memory' };
};

const areaLabels: Record<string, string> = {
  telAviv: 'תל אביב והמרכז',
  sharon: 'השרון',
  shfela: 'שפלה',
  jerusalem: 'ירושלים והסביבה',
  haifa: 'חיפה והצפון',
  south: 'באר שבע והדרום',
  other: 'אחר',
};

export default function AdminDashboard({
  initialSettings,
  leads,
  storage,
}: Props) {
  const router = useRouter();
  const [webhook, setWebhook] = useState(initialSettings.leadWebhookUrl ?? '');
  const [gtmId, setGtmId] = useState(initialSettings.gtmId ?? '');
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [logoutLoading, setLogoutLoading] = useState(false);

  const totalLeads = leads.length;
  const today = useMemo(() => {
    const d = new Date();
    const t = d.toISOString().slice(0, 10);
    return leads.filter((l) => l.submittedAt.startsWith(t)).length;
  }, [leads]);

  async function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadWebhookUrl: webhook.trim(),
          gtmId: gtmId.trim(),
        }),
      });
      if (res.ok) {
        setSavedAt(Date.now());
        router.refresh();
      } else {
        const json = await res.json().catch(() => ({}));
        if (json?.error === 'gtm_id_invalid_format') {
          setError('GTM-ID לא תקין. צריך להיראות כמו GTM-XXXXXXX');
        } else if (json?.error === 'webhook_must_start_with_http') {
          setError('כתובת ה-webhook חייבת להתחיל ב-http(s)://');
        } else {
          setError('שמירה נכשלה');
        }
      }
    } catch {
      setError('בעיה בחיבור לרשת');
    } finally {
      setSaving(false);
    }
  }

  async function onLogout() {
    setLogoutLoading(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } finally {
      setLogoutLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <header className="bg-primary-dark text-white">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="text-2xl">
              🌿
            </span>
            <div>
              <div className="font-bold text-lg">לוח בקרה</div>
              <div className="text-xs text-primary-light/80">
                חוות דניאל — ניהול האתר
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-sm text-primary-light/90 hover:text-white underline underline-offset-4"
            >
              לאתר ↗
            </a>
            <button
              type="button"
              onClick={onLogout}
              disabled={logoutLoading}
              className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-soft transition-colors disabled:opacity-60"
            >
              {logoutLoading ? 'יוצא...' : 'יציאה'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {!storage.persistent && (
          <div className="rounded-card border border-amber-300 bg-amber-50 p-4 text-amber-900 text-sm leading-relaxed">
            <strong>שים לב:</strong> שמירה זמנית במסך זה לא תיחסך לאורך deploys.
            כדי לאחסן הגדרות ולידים לטווח ארוך, הפעל Vercel KV: Storage →
            Create Database → KV → Connect.
          </div>
        )}

        <section
          aria-labelledby="leads-stats"
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-card shadow-soft p-5">
            <div className="text-3xl font-bold text-primary">{totalLeads}</div>
            <div className="text-sm text-text/70">סה״כ לידים (אחרונים 200)</div>
          </div>
          <div className="bg-white rounded-card shadow-soft p-5">
            <div className="text-3xl font-bold text-primary">{today}</div>
            <div className="text-sm text-text/70">היום</div>
          </div>
          <div className="bg-white rounded-card shadow-soft p-5">
            <div className="text-3xl font-bold text-primary">
              {storage.backend === 'kv' ? '✓' : '⚠️'}
            </div>
            <div className="text-sm text-text/70">
              {storage.backend === 'kv'
                ? 'אחסון KV פעיל'
                : 'אחסון זמני (בזיכרון)'}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="settings-title"
          className="bg-white rounded-card shadow-soft p-6 md:p-8"
        >
          <div className="mb-6">
            <h2
              id="settings-title"
              className="text-xl font-bold text-primary-dark mb-1"
            >
              הגדרות אתר
            </h2>
            <p className="text-sm text-text/70 leading-relaxed">
              שמירה כאן מעדכנת מיד את האתר החי (תוך כמה שניות בקאש).
            </p>
          </div>

          <form onSubmit={onSave} className="space-y-6">
            <div>
              <label
                htmlFor="webhook-url"
                className="block text-sm font-semibold mb-1.5 text-primary-dark"
              >
                Webhook ללידים
              </label>
              <p className="text-xs text-text/65 mb-2 leading-relaxed">
                כל ליד שיישלח דרך טופס "שיחה חוזרת" יועבר ל-URL הזה (Zapier,
                Make, n8n, וכו'). הלידים נשמרים גם אם ה-webhook נופל.
              </p>
              <input
                id="webhook-url"
                name="leadWebhookUrl"
                type="url"
                dir="ltr"
                value={webhook}
                onChange={(e) => setWebhook(e.target.value)}
                placeholder="https://hooks.zapier.com/hooks/catch/XXXX/YYYY"
                className="w-full px-4 py-3 rounded-soft border border-primary-light bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition font-mono text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="gtm-id"
                className="block text-sm font-semibold mb-1.5 text-primary-dark"
              >
                Google Tag Manager — GTM ID
              </label>
              <p className="text-xs text-text/65 mb-2 leading-relaxed">
                מזהה GTM (מתחיל ב-<code className="font-mono">GTM-</code>) שיוטמע
                אוטומטית בכל עמודי האתר. השאר ריק לכיבוי GTM.
              </p>
              <input
                id="gtm-id"
                name="gtmId"
                type="text"
                dir="ltr"
                value={gtmId}
                onChange={(e) => setGtmId(e.target.value.toUpperCase())}
                placeholder="GTM-XXXXXXX"
                pattern="GTM-[A-Z0-9]+"
                className="w-full px-4 py-3 rounded-soft border border-primary-light bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition font-mono text-sm"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-800 rounded-soft px-3 py-2 text-sm"
              >
                {error}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary !py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? 'שומר...' : 'שמירה'}
              </button>
              {savedAt && !saving && (
                <span
                  aria-live="polite"
                  className="text-sm text-primary-dark"
                >
                  נשמר ✓
                </span>
              )}
            </div>
          </form>
        </section>

        <section
          aria-labelledby="leads-title"
          className="bg-white rounded-card shadow-soft p-6 md:p-8"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2
              id="leads-title"
              className="text-xl font-bold text-primary-dark"
            >
              לידים אחרונים
            </h2>
            <button
              type="button"
              onClick={() => router.refresh()}
              className="text-sm text-primary hover:text-primary-dark underline underline-offset-4"
            >
              רענון
            </button>
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-12 text-text/60">
              <div className="text-5xl mb-3" aria-hidden="true">
                📭
              </div>
              <p>עוד לא התקבלו לידים.</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6 md:-mx-8">
              <table className="w-full text-sm">
                <thead className="bg-primary-light/40 text-primary-dark">
                  <tr>
                    <th className="text-start font-semibold px-4 py-3">
                      תאריך
                    </th>
                    <th className="text-start font-semibold px-4 py-3">שם</th>
                    <th className="text-start font-semibold px-4 py-3">
                      טלפון
                    </th>
                    <th className="text-start font-semibold px-4 py-3">
                      אזור
                    </th>
                    <th className="text-start font-semibold px-4 py-3">
                      Webhook
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-light/60">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-primary-light/20">
                      <td className="px-4 py-3 whitespace-nowrap text-text/70">
                        {new Date(lead.submittedAt).toLocaleString('he-IL', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })}
                      </td>
                      <td className="px-4 py-3 font-medium text-primary-dark">
                        {lead.name}
                      </td>
                      <td className="px-4 py-3" dir="ltr">
                        <a
                          href={`tel:${lead.phone}`}
                          className="text-primary hover:underline"
                        >
                          {lead.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-text/80">
                        {lead.area ? areaLabels[lead.area] ?? lead.area : '—'}
                      </td>
                      <td className="px-4 py-3">
                        {lead.delivered ? (
                          <span
                            className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                            title="הועבר ל-webhook"
                          >
                            ✓ הועבר
                          </span>
                        ) : (
                          <span
                            className="text-xs bg-amber-100 text-amber-900 px-2 py-1 rounded-full"
                            title={lead.deliveryError || 'לא הוגדר webhook'}
                          >
                            ⚠ לא הועבר
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
