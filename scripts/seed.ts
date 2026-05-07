import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL!;

const pool = new pg.Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  try {
    // Verificar si ya existe este SUPER_ADMIN
    const existingAdmin = await prisma.users.findUnique({
      where: {
        email: 'admin@nexthus.com',
      },
    });

    if (existingAdmin) {
      console.log('✓ Este SUPER_ADMIN ya existe:', existingAdmin.email);
      return;
    }

    // Crear contraseña hasheada
    const hashedPassword = await bcrypt.hash('Admin123456!', 12);

    // Crear SUPER_ADMIN
    const admin = await prisma.users.create({
      data: {
        fullname: 'Administrador del Sistema',
        email: 'admin@nexthus.com',
        password: hashedPassword,
        phone: '+57 300 123 4567',
        document_number: '1234567890',
        role: 'SUPER_ADMIN',
        is_active: true,
      },
    });

    console.log('✓ SUPER_ADMIN creado exitosamente');
    console.log('Email:', admin.email);
    console.log('ID:', admin.id);
  } catch (error) {
    console.error('Error al crear SUPER_ADMIN:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();