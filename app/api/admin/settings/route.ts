import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { getSettings, setSettings } from '@/lib/admin-storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/i;

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: { leadWebhookUrl?: unknown; gtmId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  const current = await getSettings();
  const next = { ...current };

  if ('leadWebhookUrl' in body) {
    const url = (body.leadWebhookUrl ?? '').toString().trim();
    if (url && !/^https?:\/\//i.test(url)) {
      return NextResponse.json(
        { error: 'webhook_must_start_with_http' },
        { status: 400 },
      );
    }
    next.leadWebhookUrl = url;
  }

  if ('gtmId' in body) {
    const gtm = (body.gtmId ?? '').toString().trim();
    if (gtm && !GTM_ID_PATTERN.test(gtm)) {
      return NextResponse.json(
        { error: 'gtm_id_invalid_format' },
        { status: 400 },
      );
    }
    next.gtmId = gtm.toUpperCase();
  }

  await setSettings(next);
  return NextResponse.json({ ok: true, ...next });
}
