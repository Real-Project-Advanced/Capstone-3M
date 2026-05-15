# SUPER_ADMIN - Guía Completa

## ✅ Estado del Sistema

**URL de Verificación**: `http://localhost:3000/status`

Esta página te mostrará:
- ✓ Si ya existe un SUPER_ADMIN
- ✓ Información del administrador
- ✓ Enlace directo para crear uno (si no existe)

---

## 🚀 Creando tu Primer SUPER_ADMIN

### Opción 1: Página Web (Más Segura) ⭐ RECOMENDADO

1. Abre: `http://localhost:3000/bootstrap`
2. Completa el formulario con:
   - **Nombre Completo**: Tu nombre
   - **Email**: admin@tuempresa.com
   - **Contraseña**: Mínimo 8 caracteres (incluye mayúscula, número, símbolo)
   - **Teléfono** (opcional): +57 300 123 4567
   - **Cédula** (opcional): 1234567890

3. Haz clic en "Crear Cuenta SUPER_ADMIN"
4. ¡Listo! Serás redirigido al login

### Opción 2: Usar el Endpoint HTTP

Realiza una petición POST a:
```
POST http://localhost:3001/api/admin/bootstrap
```

**Body JSON:**
```json
{
  "fullname": "Nombre Completo",
  "email": "admin@example.com",
  "password": "Password123456",
  "phone": "+57 300 123 4567",
  "document_number": "1234567890"
}
```

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3001/api/admin/bootstrap \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "Administrador",
    "email": "admin@nexthus.com",
    "password": "Admin123456!",
    "phone": "+57 300 123 4567",
    "document_number": "1234567890"
  }'
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "SUPER_ADMIN creado exitosamente",
  "admin": {
    "id": 1,
    "fullname": "Administrador",
    "email": "admin@nexthus.com",
    "role": "SUPER_ADMIN",
    "created_at": "2024-05-06T10:30:00Z"
  }
}
```

**Errores posibles:**
- **403**: Ya existe un SUPER_ADMIN
- **400**: Validación de datos fallida
- **500**: Error interno del servidor

---

## Opción 2: Credenciales por Defecto

Si ejecutas el seed script, se crea automáticamente:

```
Email: admin@nexthus.com
Contraseña: Admin123456!
```

---

## ¿Qué puede hacer un SUPER_ADMIN?

### 1. **Gestionar Drivers (Conductores)**
- Crear nuevos conductores
- Editar información de conductores
- Desactivar/activar conductores
- Ver histórico de licencias
- Asignar vehículos a conductores

**Información requerida:**
- Usuario vinculado (user_id)
- Tipo de licencia (license_type)
- Años de experiencia (experience_years)
- Fecha de expiración (license_expiration)
- Vehículo asignado (transport_id, opcional)

### 2. **Gestionar Transportes (Vehículos)**
- Crear nuevos transportes
- Editar placa y modelo
- Definir capacidad (pasajeros)
- Activar/desactivar vehículos
- Ver asignación de conductores

**Información requerida:**
- Placa del vehículo (plate, única)
- Modelo del vehículo (model)
- Capacidad (capacity, pasajeros)
- Estado (is_active)

### 3. **Gestionar Rutas**
- Crear nuevas rutas
- Definir origen y destino
- Asignar a transportes específicos
- Editar puntos de las rutas
- Desactivar rutas

**Información requerida:**
- Origen (origin)
- Destino (destination)
- Transporte (transport_id)

### 4. **Gestionar Usuarios**
- Crear usuarios (USER, DRIVER, SUPER_ADMIN)
- Editar información
- Activar/desactivar usuarios
- Ver permisos asignados

---

## Estructura de Roles

```
SUPER_ADMIN
├── Crear/editar todos los recursos
├── Gestionar drivers
├── Gestionar transportes
├── Gestionar rutas
└── Gestionar otros usuarios

DRIVER
├── Ver transportes asignados
├── Ver rutas asignadas
├── Registrar viajes
└── Ver historial de viajes

USER
├── Ver rutas disponibles
├── Consultar transportes
├── Realizar consultas de viajes
└── Perfil personal
```

---

## Próximos Pasos

1. **Crear el primer SUPER_ADMIN** (usando el endpoint)
2. **Inicia sesión** con sus credenciales
3. **Crea conductores** asignándoles usuarios
4. **Registra vehículos** con sus placas y modelos
5. **Define rutas** entre origen y destino
6. **Asigna conductores a vehículos**

---

## Queries SQL útiles

Ver todos los SUPER_ADMIN:
```sql
SELECT * FROM users WHERE role = 'SUPER_ADMIN';
```

Ver todos los drivers:
```sql
SELECT u.id, u.fullname, u.email, d.license_type, d.experience_years 
FROM users u 
LEFT JOIN drivers d ON u.id = d.user_id;
```

Ver transportes activos:
```sql
SELECT * FROM transports WHERE is_active = true;
```

Ver rutas por transporte:
```sql
SELECT r.*, t.plate, t.model 
FROM routes r 
JOIN transports t ON r.transport_id = t.id;
```

---

## Notas de Seguridad

⚠️ **Importante:**
- Solo un endpoint `/api/admin/bootstrap` está disponible ANTES de crear el primer SUPER_ADMIN
- Después de crear el primer SUPER_ADMIN, este endpoint NO volverá a funcionar
- Todos los SUPER_ADMIN tienen permisos completos
- Las contraseñas se hashean con bcrypt (12 rounds)
- Las sesiones se protegen con JWT y cookies HTTP-only

