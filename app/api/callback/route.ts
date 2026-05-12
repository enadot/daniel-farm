import { NextResponse } from 'next/server';
import { getBuilderSettings } from '@/lib/builder';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Lead = {
  name?: string;
  phone?: string;
  preferredTime?: string;
};

async function resolveWebhookUrl(): Promise<string | null> {
  // 1. Env var wins (Vercel / Netlify secret etc.)
  if (process.env.LEAD_WEBHOOK_URL) {
    return process.env.LEAD_WEBHOOK_URL;
  }
  // 2. Otherwise pull from the Builder.io "settings" model so the admin
  //    can change it without redeploying. Field name: `leadWebhookUrl`.
  try {
    const settings = await getBuilderSettings('he');
    const url = settings?.data?.leadWebhookUrl as string | undefined;
    return url || null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: Lead;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const name = (body.name ?? '').toString().trim();
  const phone = (body.phone ?? '').toString().trim();
  const preferredTime = (body.preferredTime ?? '').toString().trim();

  if (!name || !phone) {
    return NextResponse.json(
      { error: 'name_and_phone_required' },
      { status: 400 },
    );
  }

  const webhookUrl = await resolveWebhookUrl();

  const payload = {
    name,
    phone,
    preferredTime,
    source: 'chavat-daniel.co.il',
    submittedAt: new Date().toISOString(),
    referrer: request.headers.get('referer') ?? null,
    userAgent: request.headers.get('user-agent') ?? null,
  };

  // If no webhook is configured yet, log to the server and return success so
  // visitors never see an error during setup.
  if (!webhookUrl) {
    console.warn('[callback] no LEAD_WEBHOOK_URL configured — lead:', payload);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error(
        '[callback] webhook responded with',
        res.status,
        await res.text().catch(() => ''),
      );
      return NextResponse.json(
        { error: 'webhook_failed' },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error('[callback] webhook fetch failed', err);
    return NextResponse.json(
      { error: 'webhook_unreachable' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
