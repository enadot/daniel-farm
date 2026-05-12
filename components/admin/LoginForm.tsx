'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const json = await res.json().catch(() => ({}));
        setError(json?.error === 'wrong_password' ? 'סיסמה שגויה' : 'שגיאה בהתחברות');
        setStatus('error');
      }
    } catch {
      setError('בעיה בחיבור לרשת');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="admin-password" className="block text-sm font-medium mb-2">
          סיסמה
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-soft border border-primary-light bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
        />
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 text-red-800 rounded-soft px-3 py-2 text-sm"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full !py-3 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'מתחבר...' : 'כניסה'}
      </button>
    </form>
  );
}
