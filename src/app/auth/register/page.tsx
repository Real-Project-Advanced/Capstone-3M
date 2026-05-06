import Link from "next/link";
import { Header } from "../../../components/site/Header";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />

      <section className="grid min-h-[calc(100vh-73px)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-3xl font-black">Registro</h1>
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

            <form className="space-y-5">
              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  Nombre completo
                </span>
                <input
                  className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  autoComplete="name"
                  required
                />
              </label>

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
                  placeholder="Minimo 8 caracteres"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </label>

              <label className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-600">
                <input
                  type="checkbox"
                  className="mt-1 size-4 rounded border-slate-300 accent-blue-700"
                  required
                />
                Acepto recibir informacion de rutas, cambios de servicio y
                recomendaciones para mis trayectos urbanos.
              </label>

              <button
                type="submit"
                className="h-12 w-full rounded-lg bg-blue-700 px-5 text-sm font-bold text-white transition hover:bg-blue-800"
              >
                Crear cuenta
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-blue-700 px-6 py-10 text-white sm:px-10">
          <div className="rounded-xl bg-white/10 p-5">
            <p className="text-sm font-bold uppercase text-blue-100">
              Nexthus conecta Medellin
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight">
              Guarda tus destinos y recibe la mejor combinacion de bus, metro y
              caminata.
            </h2>
          </div>

          <div className="my-10 grid gap-4 sm:grid-cols-2">
            {[
              [
                "Rutas favoritas",
                "Casa, trabajo, universidad y lugares frecuentes.",
              ],
              ["Menos espera", "Alternativas cuando una ruta esta lenta o llena."],
              ["Costo claro", "Estimaciones para decidir antes de salir."],
              ["Enfoque local", "Trayectos pensados para moverse en Medellin."],
            ].map(([title, description]) => (
              <article
                key={title}
                className="rounded-xl bg-white p-4 text-slate-950"
              >
                <h3 className="font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>

          <p className="text-sm text-blue-100">
            Tu cuenta sera el punto de partida para personalizar rutas y
            destinos.
          </p>
        </div>
      </section>
    </main>
  );
}
