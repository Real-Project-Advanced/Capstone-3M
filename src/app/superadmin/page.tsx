import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SuperAdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  if (user.role !== 'SUPER_ADMIN') {
    redirect('/');
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-black text-slate-950 mb-2">
          Panel Super Admin
        </h1>
        <p className="text-slate-600">
          Bienvenido, <span className="font-bold">{user.fullname}</span>
        </p>

        {/* Super admin content */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Control de Sistema</h2>
          <p className="text-slate-600">Panel de control super admin próximamente...</p>
        </div>
      </div>
    </main>
  );
}
