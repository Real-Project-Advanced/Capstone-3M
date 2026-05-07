'use server';

import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { hashPassword, verifyPassword, generateToken, setAuthCookie } from '../lib/auth';
import { redirect } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Contraseña debe tener al menos 8 caracteres'),
});

export async function login(formData: FormData) {
  try {
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const validatedData = loginSchema.parse(data);

    // Find user
    const user = await prisma.users.findUnique({
      where: { email: validatedData.email },
    });

    if (!user || !user.is_active) {
      return { error: 'Usuario no encontrado o inactivo' };
    }

    // Verify password
    const isValidPassword = await verifyPassword(validatedData.password, user.password);
    if (!isValidPassword) {
      return { error: 'Contraseña incorrecta' };
    }

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
    console.error('Login error:', error);
    return { error: 'Error interno del servidor' };
  }
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