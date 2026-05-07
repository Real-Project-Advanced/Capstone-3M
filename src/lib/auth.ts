import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';
const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

export interface UserPayload {
  id: number;
  email: string;
  fullname: string;
  role: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateAccessToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  } as jwt.SignOptions);
}

export function generateRefreshToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { 
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  } as jwt.SignOptions);
}

export function generateTokens(payload: UserPayload): TokenPair {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}

export function verifyAccessToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as UserPayload;
  } catch {
    return null;
  }
}

export function generateToken(payload: UserPayload): string {
  // Mantener compatibilidad con código anterior
  return generateAccessToken(payload);
}

export function verifyToken(token: string): UserPayload | null {
  // Mantener compatibilidad con código anterior
  return verifyAccessToken(token);
}

/**
 * Guardar tokens en cookies
 * - Access Token: httpOnly, Secure, 15 minutos
 * - Refresh Token: httpOnly, Secure, 7 días
 */
export async function setAuthCookies(tokens: TokenPair): Promise<void> {
  const cookieStore = await cookies();
  
  // Access Token - corta duración
  cookieStore.set('accessToken', tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 15, // 15 minutos
    path: '/',
  });

  // Refresh Token - larga duración
  cookieStore.set('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: '/',
  });
}

/**
 * Guardar un token único (compatibilidad con código anterior)
 */
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('refreshToken')?.value;
}

export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('auth-token')?.value;
}

export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  cookieStore.delete('auth-token');
}

export async function clearAuthCookie(): Promise<void> {
  await clearAuthCookies();
}

export async function getCurrentUser(): Promise<UserPayload | null> {
  const token = await getAccessToken();
  if (!token) return null;
  return verifyAccessToken(token);
}

/**
 * Refrescar tokens usando el refresh token
 */
export async function refreshUserTokens(): Promise<TokenPair | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  const payload = verifyRefreshToken(refreshToken);
  if (!payload) return null;

  const newTokens = generateTokens(payload);
  await setAuthCookies(newTokens);
  
  return newTokens;
}
