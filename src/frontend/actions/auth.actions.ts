'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { loginSchema } from '@/shared/validators';
import { authService } from '@/backend/services/auth.service';
import { setAuthCookies } from '@/lib/auth';

/**
 * Server Action: Login
 */
export async function loginAction(formData: FormData) {
  try {
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const validatedData = loginSchema.parse(data);
    const result = await authService.login(validatedData);

    if (!result.success) {
      return { error: result.error };
    }

    if (result.data) {
      // Generar y guardar tokens en cookies
      const { generateTokens } = await import('@/lib/auth');
      const tokens = generateTokens({
        id: result.data.user.id,
        email: result.data.user.email,
        fullname: result.data.user.fullname,
        role: result.data.user.role,
      });
      
      await setAuthCookies(tokens);
      redirect('/admin/dashboard');
    }

    return { error: 'Error desconocido' };
  } catch (error) {
    // No capturar errores de redirección de Next.js
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }
    
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    console.error('Login action error:', error);
    return { error: 'Error al iniciar sesión' };
  }
}


export async function login(formData: FormData) {
  return loginAction(formData);
}
