import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function StatusPage() {
  const admin = await prisma.users.findFirst({
    where: { role: 'SUPER_ADMIN' },
    select: {
      id: true,
      fullname: true,
      email: true,
      created_at: true,
    },
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-blue-600 text-white mb-4">
            <span className="text-2xl font-black">N</span>
          </div>
          <h1 className="text-3xl font-black text-slate-950 mb-2">Nexthus</h1>
          <p className="text-sm text-slate-600">Estado del Sistema</p>
        </div>

        {admin ? (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm font-bold text-green-900 mb-2">✓ SUPER_ADMIN Existente</p>
              <div className="space-y-2 text-sm text-slate-700">
                <div>
                  <span className="font-bold">Nombre:</span>
                  <p>{admin.fullname}</p>
                </div>
                <div>
                  <span className="font-bold">Email:</span>
                  <p>{admin.email}</p>
                </div>
                <div>
                  <span className="font-bold">ID:</span>
                  <p>#{admin.id}</p>
                </div>
                <div>
                  <span className="font-bold">Creado:</span>
                  <p>{new Date(admin.created_at).toLocaleString('es-CO')}</p>
                </div>
              </div>
            </div>

            <Link
              href="/auth/login"
              className="block w-full text-center bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Ir al Login
            </Link>

            <p className="text-xs text-slate-500 text-center">
              Si olvidaste tu contraseña, contacta al administrador
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm font-bold text-yellow-900 mb-2">⚠️ Sistema Nuevo</p>
              <p className="text-sm text-yellow-800">
                No existe un SUPER_ADMIN. Crea la cuenta de administrador ahora.
              </p>
            </div>

            <Link
              href="/bootstrap"
              className="block w-full text-center bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Crear SUPER_ADMIN
            </Link>

            <p className="text-xs text-slate-500 text-center">
              Esta es una acción sensible. Solo realízala la primera vez.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
