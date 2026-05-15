import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser, refreshUserTokens } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes que no requieren autenticación
  const publicRoutes = ['/auth/login', '/auth/register', '/bootstrap', '/status', '/', '/api/auth/logout', '/api/auth/refresh', '/temp-dashboard'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Verificar si el usuario está autenticado
  let user = await getCurrentUser();

  if (!user) {
    // Intentar refrescar tokens si el accessToken expiró
    const newTokens = await refreshUserTokens();
    
    if (!newTokens) {
      // Sin sesión válida, redirigir a login
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    
    // Intenta nuevamente obtener el usuario con los nuevos tokens
    user = await getCurrentUser();
  }

  if (!user) {
    // Si aún sin usuario, redirigir a login
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
