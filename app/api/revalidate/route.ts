import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Builder.io publish webhook -> on-demand revalidation.
 *
 * Configure in Builder:
 *   Account Settings → Webhooks → Add Webhook
 *   URL:     https://YOUR_DOMAIN/api/revalidate?secret=YOUR_SECRET
 *   Event:   content.publish
 *
 * The secret value here must match BUILDER_WEBHOOK_SECRET in env.
 */
export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');

  if (
    process.env.BUILDER_WEBHOOK_SECRET &&
    secret !== process.env.BUILDER_WEBHOOK_SECRET
  ) {
    return NextResponse.json({ error: 'invalid_secret' }, { status: 401 });
  }

  let payload: Record<string, unknown> = {};
  try {
    payload = await request.json();
  } catch {
    /* empty body is fine */
  }

  // Revalidate every locale's surface. If Builder tells us a specific URL,
  // we revalidate that one too.
  const targets = new Set<string>(['/']);
  const data = payload?.data as Record<string, unknown> | undefined;
  const targetUrl = (data?.url ?? data?.urlPath) as string | undefined;
  if (targetUrl) targets.add(targetUrl);

  for (const path of targets) {
    revalidatePath(path, 'page');
    revalidatePath(`/en${path}`, 'page');
    revalidatePath(`/ru${path}`, 'page');
  }

  return NextResponse.json({ revalidated: true, paths: Array.from(targets) });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
