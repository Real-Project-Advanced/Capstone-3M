'use client';

import { createSuperAdminAction } from '@/frontend/actions/bootstrap.actions';
import { Form, FormField, FormButton } from '@/frontend/components/common/Form';
import { useState } from 'react';

export default function BootstrapPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleBootstrap(formData: FormData) {
    const result = await createSuperAdminAction(formData);
    
    if ('error' in result && result.error) {
      setError(result.error);
      setSuccess(null);
    } else if ('success' in result && result.success) {
      setSuccess(result.message);
      setError(null);
    }
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

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
            {success}
          </div>
        )}

        <Form action={handleBootstrap} className="space-y-4">
          <FormField
            label="Nombre Completo"
            name="fullname"
            type="text"
            placeholder="Tu nombre completo"
            required
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            required
          />

          <FormField
            label="Contraseña"
            name="password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            required
          />

          <FormField
            label="Teléfono (Opcional)"
            name="phone"
            type="tel"
            placeholder="+57 300 123 4567"
          />

          <FormField
            label="Cédula (Opcional)"
            name="document_number"
            type="text"
            placeholder="1234567890"
          />

          <FormButton>Crear Cuenta SUPER_ADMIN</FormButton>
        </Form>

        <p className="text-xs text-slate-500 text-center mt-6">
          ⚠️ Esta página solo funciona si no existe un SUPER_ADMIN en el sistema
        </p>
      </div>
    </main>
  );
}
