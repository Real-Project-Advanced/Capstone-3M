# 🚀 Nexthus - Sistema de Gestión de Rutas Urbanas

## 📋 Tabla de Contenidos
1. [Inicio Rápido](#inicio-rápido)
2. [Roles y Permisos](#roles-y-permisos)
3. [Guía del SUPER_ADMIN](#guía-del-super_admin)
4. [APIs y Endpoints](#apis-y-endpoints)
5. [Solución de Problemas](#solución-de-problemas)

---

## 🚀 Inicio Rápido

### 1️⃣ Verificar Estado del Sistema
```
http://localhost:3000/status
```
Esta página te muestra si existe un SUPER_ADMIN y permite crear uno si no hay.

### 2️⃣ Crear tu Primer SUPER_ADMIN

**Opción A: Interfaz Web (Recomendado)**
- Ve a: `http://localhost:3000/bootstrap`
- Completa el formulario
- Haz clic en "Crear Cuenta SUPER_ADMIN"

**Opción B: Endpoint HTTP**
```bash
curl -X POST http://localhost:3000/api/admin/bootstrap \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "Tu Nombre",
    "email": "admin@nexthus.com",
    "password": "Password123!",
    "phone": "+57 300 123 4567",
    "document_number": "1234567890"
  }'
```

### 3️⃣ Inicia Sesión
```
http://localhost:3000/auth/login
```

### 4️⃣ Accede al Panel Administrativo
```
http://localhost:3000/admin/dashboard
```

---

## 👥 Roles y Permisos

### SUPER_ADMIN
- ✅ Acceso total a todas las funciones
- ✅ Crear, editar y eliminar usuarios
- ✅ Gestionar conductores
- ✅ Gestionar vehículos
- ✅ Gestionar rutas
- ✅ Ver reportes y estadísticas

### DRIVER (Conductor)
- ✅ Ver transportes asignados
- ✅ Ver rutas asignadas
- ✅ Registrar viajes
- ✅ Ver historial personal
- ❌ No puede crear recursos

### USER (Usuario Regular)
- ✅ Ver rutas disponibles
- ✅ Consultar transportes
- ✅ Ver perfil
- ❌ No puede crear/editar recursos

---

## 📊 Guía del SUPER_ADMIN

### Panel Principal
```
/admin/dashboard
```
Aquí encontrarás:
- Dashboard con estadísticas
- Acceso rápido a todas las funciones
- Información importante del sistema

### 👥 Gestión de Usuarios

**Ver Usuarios**
```
GET /api/users
```

**Crear Usuario**
```
POST /api/users
Body: {
  "fullname": "Nombre Completo",
  "email": "usuario@email.com",
  "password": "Password123!",
  "role": "USER" | "DRIVER" | "SUPER_ADMIN",
  "phone": "+57 300 123 4567",
  "document_number": "1234567890"
}
```

**Editar Usuario**
```
PUT /api/users/:id
```

**Desactivar Usuario**
```
PATCH /api/users/:id/deactivate
```

---

### 🚗 Gestión de Conductores

**Crear Conductor**
1. Primero crea un usuario con role "DRIVER"
2. Ve a `/admin/drivers/create`
3. Completa:
   - Usuario (selecciona del dropdown)
   - Tipo de licencia (A, B, C, etc.)
   - Años de experiencia
   - Fecha de expiración de licencia
   - Vehículo (opcional, puedes asignarlo después)

**Información de Conductor**
```
{
  "user_id": 5,
  "license_type": "B",
  "experience_years": 3,
  "license_expiration": "2025-12-31T00:00:00Z",
  "transport_id": 2
}
```

**Actualizar Licencia**
```
PUT /api/drivers/:id
```

---

### 🚌 Gestión de Vehículos (Transportes)

**Crear Vehículo**
1. Ve a `/admin/transports/create`
2. Ingresa:
   - Placa (única, ej: AHB-123)
   - Modelo (ej: Mercedes Sprinter 2023)
   - Capacidad (número de pasajeros)

**Información de Vehículo**
```
{
  "plate": "AHB-123",
  "model": "Mercedes Sprinter 2023",
  "capacity": 25,
  "is_active": true
}
```

**Desactivar Vehículo**
```
PATCH /api/transports/:id/deactivate
```

---

### 🗺️ Gestión de Rutas

**Crear Ruta**
1. Ve a `/admin/routes/create`
2. Ingresa:
   - Origen (ej: Centro Comercial El Hueco)
   - Destino (ej: Estación El Hueco)
   - Vehículo (selecciona)

**Información de Ruta**
```
{
  "origin": "Centro Comercial El Hueco",
  "destination": "Estación El Hueco",
  "transport_id": 1
}
```

**Editar Ruta**
```
PUT /api/routes/:id
```

---

## 🔌 APIs y Endpoints

### Autenticación
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Bootstrap (Solo Primera Vez)
```
POST /api/admin/bootstrap
```

### Usuarios
```
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
PATCH  /api/users/:id/deactivate
PATCH  /api/users/:id/activate
```

### Conductores
```
GET    /api/drivers
GET    /api/drivers/:id
POST   /api/drivers
PUT    /api/drivers/:id
DELETE /api/drivers/:id
```

### Vehículos
```
GET    /api/transports
GET    /api/transports/:id
POST   /api/transports
PUT    /api/transports/:id
PATCH  /api/transports/:id/deactivate
PATCH  /api/transports/:id/activate
```

### Rutas
```
GET    /api/routes
GET    /api/routes/:id
POST   /api/routes
PUT    /api/routes/:id
DELETE /api/routes/:id
```

---

## 🛠️ Solución de Problemas

### Error: "Ya existe un SUPER_ADMIN"
- Ya hay un administrador en el sistema
- Para crearlo nuevamente, contacta a tu proveedor

### No puedo crear conductores
- Verifica que el usuario sea de tipo "DRIVER"
- Asegúrate que el usuario esté activo

### Las rutas no se crean
- Verifica que el vehículo exista y esté activo
- Asegúrate de llenar origen y destino

### Error de contraseña débil
- Mínimo 8 caracteres
- Se recomienda: mayúscula, minúscula, número, símbolo

### Olvide la contraseña
- Contacta al SUPER_ADMIN para que cree una nueva cuenta
- O usa el endpoint de reseteo (si está implementado)

---

## 📱 Rutas Principales

| URL | Descripción |
|-----|------------|
| `/` | Página principal |
| `/status` | Estado del sistema |
| `/bootstrap` | Crear SUPER_ADMIN |
| `/auth/login` | Iniciar sesión |
| `/auth/register` | Registro de usuario |
| `/admin/dashboard` | Panel administrativo |
| `/admin/users` | Gestión de usuarios |
| `/admin/drivers` | Gestión de conductores |
| `/admin/transports` | Gestión de vehículos |
| `/admin/routes` | Gestión de rutas |

---

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt (12 rounds)
- ✅ JWT con expiración de 7 días
- ✅ Cookies HTTP-only
- ✅ Validación de entrada con Zod
- ✅ Protección CSRF implícita
- ✅ Solo un SUPER_ADMIN puede crear otro SUPER_ADMIN

---

## 📞 Contacto y Soporte

Para problemas o sugerencias:
- Email: support@nexthus.com
- Documentación: [Ver SETUP_SUPERADMIN.md](./SETUP_SUPERADMIN.md)

---

**Última actualización**: Mayo 6, 2026
**Versión**: 1.0.0
