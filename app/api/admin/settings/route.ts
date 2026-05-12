import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { getSettings, setSettings } from '@/lib/admin-storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

  let body: { leadWebhookUrl?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  const url = (body.leadWebhookUrl ?? '').toString().trim();
  if (url && !/^https?:\/\//i.test(url)) {
    return NextResponse.json(
      { error: 'must_start_with_http' },
      { status: 400 },
    );
  }

  await setSettings({ leadWebhookUrl: url });
  return NextResponse.json({ ok: true, leadWebhookUrl: url });
}
