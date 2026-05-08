import Link from 'next/link';

/**
 * Header: Componente de encabezado reutilizable
 */
export function Header() {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 sm:px-10 ring-1 ring-slate-200">
      <div>
        <Link href="/">
          <h1 className="text-2xl font-bold text-blue-700">NEXTHUS</h1>
        </Link>
      </div>
      <nav className="flex gap-6">
        <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-blue-700">
          Inicio
        </Link>
        <Link href="/auth/login" className="text-sm font-semibold text-slate-700 hover:text-blue-700">
          Login
        </Link>
      </nav>
    </header>
  );
}
