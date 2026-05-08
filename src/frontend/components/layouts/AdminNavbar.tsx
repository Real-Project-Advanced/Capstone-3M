import Link from 'next/link';

interface AdminNavbarProps {
  title?: string;
}

export function AdminNavbar({ title = 'Nexthus' }: AdminNavbarProps) {
  return (
    <header className="flex items-center justify-between gap-4 rounded-b-2xl bg-white px-6 py-4 shadow-sm ring-1 ring-slate-200">
      <div>
        <Link href="/admin/dashboard" className="text-xl font-black text-slate-950 hover:text-blue-700">
          {title}
        </Link>
      </div>

      <form action="/api/auth/logout" method="post">
        <button
          type="submit"
          className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Cerrar sesión
        </button>
      </form>
    </header>
  );
}
