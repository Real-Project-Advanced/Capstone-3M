import { NextResponse } from 'next/server';
import { refreshUserTokens } from '@/lib/auth';

/**
 * POST /api/auth/refresh
 * Refrescar tokens usando el refresh token
 */
export async function POST(request: Request) {
  try {
    const newTokens = await refreshUserTokens();

    if (!newTokens) {
      return NextResponse.json(
        { error: 'No hay sesión activa o refresh token inválido' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Tokens refrescados correctamente',
        data: {
          accessToken: newTokens.accessToken,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Refresh tokens error:', error);

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
