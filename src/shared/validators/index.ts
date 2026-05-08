import { z } from 'zod';

// Esquema de Login
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Esquema de Registro
export const registerSchema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Contraseña debe tener al menos 8 caracteres'),
});

export type RegisterInput = z.infer<typeof registerSchema>;

// Esquema de Crear SUPER_ADMIN
export const createSuperAdminSchema = z.object({
  fullname: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Contraseña debe tener al menos 8 caracteres'),
  phone: z.string().optional(),
  document_number: z.string().optional(),
});

export type CreateSuperAdminInput = z.infer<typeof createSuperAdminSchema>;

// Esquema de Crear Conductor
export const createDriverSchema = z.object({
  user_id: z.number().positive(),
  license_type: z.string().min(1),
  experience_years: z.number().nonnegative(),
  license_expiration: z.string().datetime(),
});

export type CreateDriverInput = z.infer<typeof createDriverSchema>;

// Esquema de Crear Transporte
export const createTransportSchema = z.object({
  plate: z.string().min(1),
  model: z.string().min(1),
  capacity: z.number().positive(),
});

export type CreateTransportInput = z.infer<typeof createTransportSchema>;

// Esquema de Crear Ruta
export const createRouteSchema = z.object({
  origin: z.string().min(1),
  destination: z.string().min(1),
  transport_id: z.number().positive(),
});

export type CreateRouteInput = z.infer<typeof createRouteSchema>;
