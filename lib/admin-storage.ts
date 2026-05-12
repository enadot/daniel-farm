/**
 * Storage backend for the admin panel.
 *
 * - When Vercel KV env vars are present, data persists in Redis (Upstash).
 * - Otherwise it falls back to an in-process Map / array. That fallback
 *   is fine for `npm run dev` but resets on every deploy, so don't rely
 *   on it in production.
 */

export type Settings = {
  leadWebhookUrl: string;
  gtmId?: string;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  area?: string;
  source: string;
  submittedAt: string;
  referrer: string | null;
  userAgent: string | null;
  delivered: boolean;
  deliveryError?: string;
};

const SETTINGS_KEY = 'chavat-daniel:settings';
const LEADS_KEY = 'chavat-daniel:leads';
const MAX_LEADS = 500;

let memSettings: Settings = { leadWebhookUrl: '', gtmId: '' };
const memLeads: Lead[] = [];

type KvModule = typeof import('@vercel/kv');
let kvPromise: Promise<KvModule['kv'] | null> | null = null;

function isKvConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function getKv(): Promise<KvModule['kv'] | null> {
  if (!isKvConfigured()) return null;
  if (!kvPromise) {
    kvPromise = import('@vercel/kv')
      .then((mod) => mod.kv)
      .catch((err) => {
        console.warn('[admin-storage] @vercel/kv not available:', err);
        return null;
      });
  }
  return kvPromise;
}

export async function getSettings(): Promise<Settings> {
  const kv = await getKv();
  if (kv) {
    const stored = await kv.get<Settings>(SETTINGS_KEY);
    return stored ?? { leadWebhookUrl: '', gtmId: '' };
  }
  return { ...memSettings };
}

/**
 * Cached version used during a single React render. Safe to call from
 * a server component layout: subsequent calls in the same request hit
 * the cache instead of KV.
 */
import { cache } from 'react';
export const getCachedSettings = cache(async (): Promise<Settings> => {
  try {
    return await getSettings();
  } catch (err) {
    console.warn('[admin-storage] getCachedSettings failed:', err);
    return { leadWebhookUrl: '', gtmId: '' };
  }
});

export async function setSettings(settings: Settings): Promise<void> {
  const kv = await getKv();
  if (kv) {
    await kv.set(SETTINGS_KEY, settings);
  } else {
    memSettings = { ...settings };
  }
}

export async function appendLead(lead: Lead): Promise<void> {
  const kv = await getKv();
  if (kv) {
    await kv.lpush(LEADS_KEY, JSON.stringify(lead));
    await kv.ltrim(LEADS_KEY, 0, MAX_LEADS - 1);
  } else {
    memLeads.unshift(lead);
    if (memLeads.length > MAX_LEADS) memLeads.length = MAX_LEADS;
  }
}

export async function listLeads(limit = 100): Promise<Lead[]> {
  const kv = await getKv();
  if (kv) {
    const raw = await kv.lrange<string>(LEADS_KEY, 0, limit - 1);
    return raw
      .map((r) => {
        if (typeof r === 'string') {
          try {
            return JSON.parse(r) as Lead;
          } catch {
            return null;
          }
        }
        return r as unknown as Lead;
      })
      .filter((l): l is Lead => l !== null);
  }
  return memLeads.slice(0, limit);
}

export async function storageStatus(): Promise<{
  persistent: boolean;
  backend: 'kv' | 'memory';
}> {
  return isKvConfigured()
    ? { persistent: true, backend: 'kv' }
    : { persistent: false, backend: 'memory' };
}
