import { redirect } from 'next/navigation';
import { isAdminConfigured, isAuthenticated } from '@/lib/admin-auth';
import LoginForm from '@/components/admin/LoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  if (await isAuthenticated()) {
    redirect('/admin');
  }
  const configured = isAdminConfigured();

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-card shadow-soft-lg p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3" aria-hidden="true">
            🔐
          </div>
          <h1 className="text-2xl font-bold text-primary-dark mb-1">
            לוח בקרה
          </h1>
          <p className="text-sm text-text/70">
            חוות דניאל — ניהול האתר
          </p>
        </div>

        {!configured ? (
          <div className="rounded-soft border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
            <p className="font-semibold mb-1">לוח הבקרה עוד לא הוגדר</p>
            <p>
              קבע סיסמה ב-Vercel:
              <br />
              <code className="block mt-2 bg-amber-100 rounded px-2 py-1 font-mono text-xs">
                ADMIN_PASSWORD=הסיסמה-שלך
                <br />
                ADMIN_SECRET=מחרוזת-רנדומלית
              </code>
              <br />
              לאחר deploy תוכל להיכנס.
            </p>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </main>
  );
}
