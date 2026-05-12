import { redirect } from 'next/navigation';
import { isAuthenticated, isAdminConfigured } from '@/lib/admin-auth';
import { getSettings, listLeads, storageStatus } from '@/lib/admin-storage';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!isAdminConfigured()) {
    redirect('/admin/login');
  }
  if (!(await isAuthenticated())) {
    redirect('/admin/login');
  }

  const [settings, leads, storage] = await Promise.all([
    getSettings(),
    listLeads(200),
    storageStatus(),
  ]);

  return (
    <AdminDashboard
      initialSettings={settings}
      leads={leads}
      storage={storage}
    />
  );
}
