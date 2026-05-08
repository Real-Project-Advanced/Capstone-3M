import Link from 'next/link';
import { Header } from '@/components/common/Header';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  children: React.ReactNode;
  footerText?: string;
  footerLink?: {
    text: string;
    href: string;
  };
}

/**
 * AuthLayout: Layout para páginas de autenticación
 */
export async function AuthLayout({
  title,
  subtitle,
  description,
  children,
  footerText,
  footerLink,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-blue-50 text-slate-950">
      <Header />

      <section className="grid min-h-[calc(100vh-73px)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-between px-6 py-10 sm:px-10">
          <div className="my-12 max-w-xl">
            <p className="mb-4 inline-flex rounded-lg bg-white px-3 py-2 text-sm font-bold text-blue-700 ring-1 ring-blue-100">
              {subtitle}
            </p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl">{title}</h1>
            <p className="mt-5 text-base leading-7 text-slate-700">{description}</p>
          </div>

          <p className="text-sm text-slate-500">Rutas urbanas, conexiones y tiempos aproximados en un solo lugar.</p>
        </div>

        <div className="flex items-center justify-center bg-white px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </section>

      {footerText && footerLink && (
        <footer className="border-t border-slate-200 bg-white py-6 text-center">
          <p className="text-sm text-slate-600">
            {footerText}{' '}
            <Link href={footerLink.href} className="font-bold text-blue-700 hover:text-blue-800">
              {footerLink.text}
            </Link>
          </p>
        </footer>
      )}
    </main>
  );
}
