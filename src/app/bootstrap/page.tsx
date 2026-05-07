import { bootstrap } from '@/actions/auth';
import { redirect } from 'next/navigation';

export default function BootstrapPage() {
  async function handleBootstrap(formData: FormData) {
    'use server';
    
    const result = await bootstrap(formData);
    
    if (result.error) {
      console.error(result.error);
      return;
    }
    
    redirect('/auth/login');
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-blue-600 text-white mb-4">
            <span className="text-2xl font-black">N</span>
          </div>
          <h1 className="text-3xl font-black text-slate-950 mb-2">Nexthus</h1>
          <p className="text-sm text-slate-600">Crear cuenta de administrador</p>
        </div>

        <form action={handleBootstrap} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Tu nombre completo"
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="Mínimo 8 caracteres"
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              minLength={8}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Teléfono (Opcional)
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+57 300 123 4567"
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Cédula (Opcional)
            </label>
            <input
              type="text"
              name="document_number"
              placeholder="1234567890"
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition"
          >
            Crear Cuenta SUPER_ADMIN
          </button>
        </form>

        <p className="text-xs text-slate-500 text-center mt-6">
          ⚠️ Esta página solo funciona si no existe un SUPER_ADMIN en el sistema
        </p>
      </div>
    </main>
  );
}
