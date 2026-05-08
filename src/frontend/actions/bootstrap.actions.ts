'use server';

import { z } from 'zod';
import { createSuperAdminSchema } from '@/shared/validators';
import { authService } from '@/backend/services/auth.service';

/**
 * Server Action: Crear SUPER_ADMIN
 */
export async function createSuperAdminAction(formData: FormData) {
  try {
    const data = {
      fullname: formData.get('fullname') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      phone: formData.get('phone') as string | undefined,
      document_number: formData.get('document_number') as string | undefined,
    };

    const validatedData = createSuperAdminSchema.parse(data);
    const result = await authService.createSuperAdmin(validatedData);

    if (!result.success) {
      return { error: result.error };
    }

    return {
      success: true,
      message: 'SUPER_ADMIN creado exitosamente',
      data: result.data,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    console.error('Create super admin action error:', error);
    return { error: 'Error al crear SUPER_ADMIN' };
  }
}

export async function createSuperAdmin(formData: FormData) {
  return createSuperAdminAction(formData);
}
