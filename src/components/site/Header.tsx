import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-blue-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Inicio">
          <span className="grid size-10 place-items-center rounded-lg bg-blue-700 text-lg font-black text-white">
            N
          </span>
          <span className="text-lg font-black text-slate-950">Nexthus</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className="rounded-lg px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
          >
            Inicio
          </Link>
          <Link
            href="/auth/register"
            className="rounded-lg px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
          >
            Registro
          </Link>
          <Link
            href="/auth/login"
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-800"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
