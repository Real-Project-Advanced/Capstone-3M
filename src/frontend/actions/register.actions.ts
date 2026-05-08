'use server';

import { z } from 'zod';
import { registerSchema } from '@/shared/validators';
import { authService } from '@/backend/services/auth.service';
import { setAuthCookies } from '@/lib/auth';
import { redirect } from 'next/navigation';

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
      const { generateTokens } = await import('@/lib/auth');

      const tokens = generateTokens({
        id: result.data.user.id,
        email: result.data.user.email,
        fullname: result.data.user.fullname,
        role: result.data.user.role,
      });

      await setAuthCookies(tokens);
      redirect('/');
    }

  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('NEXT_REDIRECT')
    ) {
      throw error;
    }

    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }

    console.error('Register action error:', error);

    return { error: 'Error al registrarse' };
  }
}
