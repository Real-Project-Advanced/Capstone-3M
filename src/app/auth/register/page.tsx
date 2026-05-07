import Link from "next/link";
import { AuthLayout } from "@/frontend/components/layouts/AuthLayout";
import { Form, FormField, FormButton } from "@/frontend/components/common/Form";
import { registerAction } from "@/frontend/actions/register.actions";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Crea tu cuenta y planea tus rutas"
      subtitle="Regístrate"
      description="Guarda tus destinos favoritos, recibe recomendaciones personalizadas y accede a las mejores rutas en Medellín."
      footerText="Ya tienes cuenta?"
      footerLink={{ text: "Inicia sesión", href: "/auth/login" }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-black">Registro</h2>
        <p className="mt-2 text-sm text-slate-600">
          Ya tienes cuenta?{" "}
          <Link
            href="/auth/login"
            className="font-bold text-blue-700 hover:text-blue-800"
          >
            Inicia sesion
          </Link>
        </p>
      </div>

      <Form action={registerAction}>
        <FormField
          label="Nombre completo"
          name="name"
          type="text"
          placeholder="Tu nombre"
          autoComplete="name"
          required
        />

        <FormField
          label="Correo"
          name="email"
          type="email"
          placeholder="tu@email.com"
          autoComplete="email"
          required
        />

        <FormField
          label="Contraseña"
          name="password"
          type="password"
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
          required
        />

        <label className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-600">
          <input
            type="checkbox"
            className="mt-1 size-4 rounded border-slate-300 accent-blue-700"
            required
          />
          Acepto recibir información de rutas, cambios de servicio y recomendaciones para mis trayectos urbanos.
        </label>

        <FormButton>Crear cuenta</FormButton>
      </Form>
    </AuthLayout>
  );
}
