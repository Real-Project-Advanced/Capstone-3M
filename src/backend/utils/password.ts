import bcrypt from 'bcryptjs';
import { BCRYPT_ROUNDS } from '@/shared/constants';

/**
 * Encripta una contraseña usando bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

/**
 * Verifica una contraseña contra su hash
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
