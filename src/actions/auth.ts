'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { loginSchema } from '@/shared/validators';
import { authService } from '@/services/auth.service';
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
      redirect('/admin');
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

export async function register(formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const validatedData = registerSchema.parse(data);

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return { error: 'El email ya está registrado' };
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);

    // Create user
    const user = await prisma.users.create({
      data: {
        fullname: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: 'USER',
      },
    });

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      role: user.role,
    });

    // Set cookie
    await setAuthCookie(token);

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    console.error('Register error:', error);
    return { error: 'Error interno del servidor' };
  }
}

export async function logout() {
  'use server';
  // This will be handled by the logout route
}

const bootstrapSchema = z.object({
  fullname: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Contraseña debe tener al menos 8 caracteres'),
  phone: z.string().optional(),
  document_number: z.string().optional(),
});

export async function bootstrap(formData: FormData) {
  try {
    // Check if SUPER_ADMIN already exists
    const existingAdmin = await prisma.users.findFirst({
      where: { role: 'SUPER_ADMIN' },
    });

    if (existingAdmin) {
      return { error: 'Ya existe un SUPER_ADMIN en el sistema' };
    }

    const data = {
      fullname: formData.get('fullname') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      phone: formData.get('phone') as string | null,
      document_number: formData.get('document_number') as string | null,
    };

    const validatedData = bootstrapSchema.parse(data);

    // Check if email already exists
    const emailExists = await prisma.users.findUnique({
      where: { email: validatedData.email },
    });

    if (emailExists) {
      return { error: 'El email ya está registrado' };
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);

    // Create SUPER_ADMIN
    const admin = await prisma.users.create({
      data: {
        fullname: validatedData.fullname,
        email: validatedData.email,
        password: hashedPassword,
        phone: validatedData.phone || null,
        document_number: validatedData.document_number || null,
        role: 'SUPER_ADMIN',
        is_active: true,
      },
    });

    // Generate token
    const token = generateToken({
      id: admin.id,
      email: admin.email,
      fullname: admin.fullname,
      role: admin.role,
    });

    // Set cookie
    await setAuthCookie(token);

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    console.error('Bootstrap error:', error);
    return { error: 'Error interno del servidor' };
  }
}