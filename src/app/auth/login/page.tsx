import Link from "next/link";
import { Header } from "../../../components/site/Header";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-blue-50 text-slate-950">
      <Header />

      <section className="grid min-h-[calc(100vh-73px)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-between px-6 py-10 sm:px-10">
          <div className="my-12 max-w-xl">
            <p className="mb-4 inline-flex rounded-lg bg-white px-3 py-2 text-sm font-bold text-blue-700 ring-1 ring-blue-100">
              Bienvenido de nuevo
            </p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              Entra y planea tu proxima ruta por Medellin.
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-700">
              Guarda destinos frecuentes, revisa rutas recomendadas y compara
              alternativas antes de salir.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            Rutas urbanas, conexiones y tiempos aproximados en un solo lugar.
          </p>
        </div>

        <div className="flex items-center justify-center bg-white px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
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

            <form className="space-y-5">
              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  Correo
                </span>
                <input
                  className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  Contrasena
                </span>
                <input
                  className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
                  type="password"
                  name="password"
                  placeholder="Ingresa tu contrasena"
                  autoComplete="current-password"
                  required
                />
              </label>

              <div className="flex items-center justify-between gap-4 text-sm">
                <label className="flex items-center gap-2 font-semibold text-slate-600">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-slate-300 accent-blue-700"
                  />
                  Recordarme
                </label>
                <Link href="/" className="font-bold text-blue-700">
                  Olvide mi contrasena
                </Link>
              </div>

              <button
                type="submit"
                className="h-12 w-full rounded-lg bg-blue-700 px-5 text-sm font-bold text-white transition hover:bg-blue-800"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
