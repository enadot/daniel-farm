import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { getBuilderSettings } from '@/lib/builder';
import { appendLead, getSettings, type Lead } from '@/lib/admin-storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type IncomingLead = {
  name?: string;
  phone?: string;
  area?: string;
  preferredTime?: string;
};

async function resolveWebhookUrl(): Promise<string | null> {
  // 1. Env var wins (Vercel / Netlify secret etc.)
  if (process.env.LEAD_WEBHOOK_URL) {
    return process.env.LEAD_WEBHOOK_URL;
  }
  // 2. Our own admin panel storage (KV-backed).
  try {
    const settings = await getSettings();
    if (settings.leadWebhookUrl) return settings.leadWebhookUrl;
  } catch (err) {
    console.warn('[callback] could not read admin settings:', err);
  }
  // 3. Legacy fallback: Builder.io "settings" model.
  try {
    const builderSettings = await getBuilderSettings('he');
    const url = builderSettings?.data?.leadWebhookUrl as string | undefined;
    return url || null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: IncomingLead;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const name = (body.name ?? '').toString().trim();
  const phone = (body.phone ?? '').toString().trim();
  const area = (body.area ?? '').toString().trim();

  if (!name || !phone) {
    return NextResponse.json(
      { error: 'name_and_phone_required' },
      { status: 400 },
    );
  }

  const webhookUrl = await resolveWebhookUrl();

  const lead: Lead = {
    id: randomUUID(),
    name,
    phone,
    area: area || undefined,
    source: 'chavat-daniel.co.il',
    submittedAt: new Date().toISOString(),
    referrer: request.headers.get('referer') ?? null,
    userAgent: request.headers.get('user-agent') ?? null,
    delivered: false,
  };

  // Forward to webhook if one is configured.
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: lead.id,
          name: lead.name,
          phone: lead.phone,
          area: lead.area,
          source: lead.source,
          submittedAt: lead.submittedAt,
          referrer: lead.referrer,
          userAgent: lead.userAgent,
        }),
      });
      if (res.ok) {
        lead.delivered = true;
      } else {
        const text = await res.text().catch(() => '');
        lead.deliveryError = `${res.status} ${text}`.slice(0, 300);
        console.error('[callback] webhook responded with', lead.deliveryError);
      }
    } catch (err) {
      lead.deliveryError =
        err instanceof Error ? err.message : 'unknown_error';
      console.error('[callback] webhook fetch failed', err);
    }
  } else {
    lead.deliveryError = 'no_webhook_configured';
  }

  // Always persist the lead so it survives in the admin panel even if
  // the webhook is offline.
  try {
    await appendLead(lead);
  } catch (err) {
    console.error('[callback] could not persist lead:', err);
  }

  return NextResponse.json({
    ok: true,
    delivered: lead.delivered,
  });
}
