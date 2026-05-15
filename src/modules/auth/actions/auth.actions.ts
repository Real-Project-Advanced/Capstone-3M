'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { loginSchema, registerSchema } from '@/shared/validators';
import { authService } from '@/modules/auth/services/auth.service';
import { setAuthCookies, generateTokens } from '@/lib/auth';

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
      const tokens = await generateTokens({
        id: result.data.user.id,
        email: result.data.user.email,
        fullname: result.data.user.fullname,
        role: result.data.user.role,
      });
      
      await setAuthCookies(tokens);
      redirect('/admin');
    }

    return { error: 'Error desconocido' };
  } catch (error: any) {
    if (error.message?.includes('NEXT_REDIRECT')) throw error;
    if (error instanceof z.ZodError) return { error: error.issues[0].message };
    console.error('Login action error:', error);
    return { error: 'Error al iniciar sesión' };
  }
}

/**
 * Server Action: Register
 */
export async function registerAction(formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const validatedData = registerSchema.parse(data);
    const result = await authService.register(validatedData);

    if (!result.success) {
      return { error: result.error };
    }

    if (result.data) {
      const tokens = await generateTokens({
        id: result.data.user.id,
        email: result.data.user.email,
        fullname: result.data.user.fullname,
        role: result.data.user.role,
      });
      
      await setAuthCookies(tokens);
      redirect('/dashboard');
    }

    return { error: 'Error desconocido' };
  } catch (error: any) {
    if (error.message?.includes('NEXT_REDIRECT')) throw error;
    if (error instanceof z.ZodError) return { error: error.issues[0].message };
    console.error('Register action error:', error);
    return { error: 'Error al registrar' };
  }
}

/**
 * Server Action: Bootstrap (Initial Super Admin)
 */
export async function bootstrap(formData: FormData) {
  try {
    const data = {
      fullname: formData.get('fullname') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      phone: formData.get('phone') as string || undefined,
      document_number: formData.get('document_number') as string || undefined,
    };

    const result = await authService.createSuperAdmin(data);

    if (!result.success) {
      return { error: result.error };
    }

    if (result.data) {
      const tokens = await generateTokens({
        id: result.data.id,
        email: result.data.email,
        fullname: result.data.fullname,
        role: result.data.role,
      });
      
      await setAuthCookies(tokens);
      redirect('/admin');
    }

    return { error: 'Error desconocido' };
  } catch (error: any) {
    if (error.message?.includes('NEXT_REDIRECT')) throw error;
    console.error('Bootstrap error:', error);
    return { error: 'Error al crear administrador inicial' };
  }
}

/**
 * Server Action: Logout
 */
export async function logoutAction() {
  const { clearAuthCookies } = await import('@/lib/auth');
  await clearAuthCookies();
  redirect('/');
}