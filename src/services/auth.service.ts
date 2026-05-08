import { UserPayload, UserRole, OperationResult } from '@/shared/types';
import { ERROR_MESSAGES } from '@/shared/constants';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import { userRepository } from '@/backend/repositories/user.repository';
import { LoginInput, RegisterInput } from '@/shared/validators';

/**
 * AuthService: Lógica empresarial de autenticación
 */
export class AuthService {
  /**
   * Login de usuario
   */
  async login(input: LoginInput): Promise<OperationResult<{ user: UserPayload }>> {
    try {
      // Buscar usuario
      const user = await userRepository.findByEmail(input.email);

      if (!user) {
        return {
          success: false,
          error: ERROR_MESSAGES.USER_NOT_FOUND,
        };
      }

      if (!user.is_active) {
        return {
          success: false,
          error: ERROR_MESSAGES.USER_INACTIVE,
        };
      }

      // Verificar contraseña
      const isValidPassword = await verifyPassword(input.password, user.password);
      if (!isValidPassword) {
        return {
          success: false,
          error: ERROR_MESSAGES.INVALID_PASSWORD,
        };
      }

      // Preparar payload del usuario
      const userPayload: UserPayload = {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        role: user.role as UserRole,
      };

      return {
        success: true,
        data: { user: userPayload },
      };
    } catch (error) {
      console.error('Auth Service - Login error:', error);
      return {
        success: false,
        error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      };
    }
  }

  /**
   * Registro de usuario
   */
  async register(input: RegisterInput): Promise<OperationResult<{ user: UserPayload }>> {
    try {
      // Verificar si el email ya existe
      const existingUser = await userRepository.findByEmail(input.email);
      if (existingUser) {
        return {
          success: false,
          error: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
        };
      }

      // Hash de contraseña
      const hashedPassword = await hashPassword(input.password);

      // Crear usuario
      const user = await userRepository.create({
        fullname: input.name,
        email: input.email,
        password: hashedPassword,
        role: UserRole.USER,
      });

      // Preparar payload del usuario
      const userPayload: UserPayload = {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        role: user.role as UserRole,
      };

      return {
        success: true,
        data: { user: userPayload },
      };
    } catch (error) {
      console.error('Auth Service - Register error:', error);
      return {
        success: false,
        error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      };
    }
  }
}

export const authService = new AuthService();
