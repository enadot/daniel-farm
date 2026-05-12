import { NextResponse } from 'next/server';
import {
  isAdminConfigured,
  verifyPassword,
  setAuthCookie,
} from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: 'admin_not_configured' },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  const password = (body.password ?? '').toString();
  if (!password) {
    return NextResponse.json({ error: 'password_required' }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: 'wrong_password' }, { status: 401 });
  }

  await setAuthCookie();
  return NextResponse.json({ ok: true });
}
