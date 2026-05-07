const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Verificar si ya existe un SUPER_ADMIN
    const existingAdmin = await prisma.users.findFirst({
      where: { role: 'SUPER_ADMIN' },
    });

    if (existingAdmin) {
      console.log('✓ Ya existe un SUPER_ADMIN:', existingAdmin.email);
      return;
    }

    // Crear contraseña hasheada
    const hashedPassword = await bcrypt.hash('Admin123456!', 12);

    // Crear el SUPER_ADMIN
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

    console.log('✓ SUPER_ADMIN creado exitosamente:');
    console.log('  Email:', admin.email);
    console.log('  Contraseña: Admin123456!');
    console.log('  ID:', admin.id);
  } catch (error) {
    console.error('Error al crear SUPER_ADMIN:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
