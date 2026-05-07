import jwt from 'jsonwebtoken';
import { UserPayload } from '@/shared/types';
import { JWT_SECRET, JWT_EXPIRES_IN } from '@/shared/constants';

/**
 * Genera un JWT token
 */
export function generateToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
}

/**
 * Verifica y decodifica un JWT token
 */
export function verifyToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch {
    return null;
  }
}
