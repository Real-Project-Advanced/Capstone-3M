import { NextResponse } from 'next/server';
import { clearAuthCookies } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await clearAuthCookies();

    return NextResponse.redirect(
      new URL('/login', request.url),
      { status: 302 }
    );
  } catch (error) {
    console.error('Logout error:', error);

    return NextResponse.redirect(
      new URL('/login', request.url),
      { status: 302 }
    );
  }
}
