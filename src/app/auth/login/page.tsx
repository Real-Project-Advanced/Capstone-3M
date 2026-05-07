import Link from "next/link";
import { AuthLayout } from "@/frontend/components/layouts/AuthLayout";
import { Form, FormField, FormButton } from "@/frontend/components/common/Form";
import { loginAction } from "@/frontend/actions/auth.actions";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Entra y planea tu proxima ruta por Medellin."
      subtitle="Bienvenido de nuevo"
      description="Guarda destinos frecuentes, revisa rutas recomendadas y compara alternativas antes de salir."
      footerText="Aun no tienes cuenta?"
      footerLink={{ text: "Registrate", href: "/auth/register" }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-black">Login</h2>
        <p className="mt-2 text-sm text-slate-600">
          Aun no tienes cuenta?{" "}
          <Link
            href="/auth/register"
            className="font-bold text-blue-700 hover:text-blue-800"
          >
            Registrate
          </Link>
        </p>
      </div>

      <Form action={loginAction}>
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
          placeholder="Ingresa tu contraseña"
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 font-semibold text-slate-600">
            <input
              type="checkbox"
              className="size-4 rounded border-slate-300 accent-blue-700"
            />
            Recordarme
          </label>
          <Link href="/" className="font-bold text-blue-700">
            Olvide mi contraseña
          </Link>
        </div>

        <FormButton>Entrar</FormButton>
      </Form>
    </AuthLayout>
  );
}
