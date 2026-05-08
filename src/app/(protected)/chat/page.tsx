import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ChatPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-black text-slate-950 mb-2">
          Chat de Rutas
        </h1>
        <p className="text-slate-600">
          Obtén recomendaciones personalizadas de rutas
        </p>

        {/* Placeholder for chat content */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <p className="text-slate-600">Interfaz de chat próximamente...</p>
        </div>
      </div>
    </main>
  );
}
