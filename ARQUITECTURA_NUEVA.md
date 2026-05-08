# Nueva Arquitectura del Proyecto

## Resumen de Cambios

Tu proyecto ha sido refactorizado para seguir una estructura más clara y escalable. A continuación se detalla la nueva arquitectura:

## Estructura Principal

```
src/
├── app/
│   ├── (auth)                    # Route group para autenticación
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── layout.tsx
│   ├── (protected)               # Route group para rutas protegidas
│   │   ├── chat/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── favorites/page.tsx
│   │   ├── history/page.tsx
│   │   ├── routes/[id]/page.tsx
│   │   └── layout.tsx
│   ├── admin/
│   │   ├── page.tsx             # Panel principal admin
│   │   ├── driver/page.tsx      # Gestión de conductores
│   │   └── routes/page.tsx      # Gestión de rutas
│   ├── driver/
│   │   ├── dashboard/page.tsx
│   │   └── status/page.tsx
│   ├── superadmin/page.tsx
│   ├── api/
│   │   ├── (auth)/              # Route group para API auth
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   ├── me/route.ts
│   │   │   ├── refresh/route.ts
│   │   │   └── register/route.ts
│   │   └── chat/route.ts
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   └── favicon.ico
│
├── components/
│   ├── auth/                     # Componentes de autenticación
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── index.ts
│   ├── chat/                     # Componentes de chat
│   │   ├── button.tsx
│   │   └── index.ts
│   ├── features/                 # Componentes de características
│   │   ├── ChatInterface.tsx
│   │   └── index.ts
│   ├── map/                      # Componentes de mapas
│   │   ├── BusMarker.tsx
│   │   ├── MapView.tsx
│   │   ├── MapWrapper.tsx
│   │   ├── RouteCard.tsx
│   │   ├── RoutePolyline.tsx
│   │   ├── RouteSidebar.tsx
│   │   └── index.ts
│   ├── common/                   # Componentes comunes/reutilizables
│   │   ├── Form.tsx
│   │   ├── Header.tsx
│   │   └── index.ts
│   ├── layouts/                  # Layouts compartidos
│   │   ├── AuthLayout.tsx
│   │   ├── AdminNavbar.tsx
│   │   └── index.ts
│   └── index.ts
│
├── lib/
│   ├── auth/                     # Utilidades de autenticación
│   │   ├── index.ts
│   │   ├── jwt.ts
│   │   └── password.ts
│   ├── db/                       # Configuración de base de datos
│   │   └── prisma.ts
│   ├── maps/                     # Utilidades de mapas
│   ├── utils/                    # Utilidades generales
│   └── index.ts
│
├── services/
│   ├── auth.service.ts           # Lógica de autenticación
│   ├── route.service.ts          # Lógica de rutas
│   ├── ai.service.ts             # Lógica de IA
│   └── index.ts
│
├── actions/
│   ├── auth.ts
│   ├── register.ts
│   └── bootstrap.ts
│
├── types/
│   ├── auth.ts                   # Tipos de autenticación
│   ├── bus.ts                    # Tipos de autobús
│   ├── route.ts                  # Tipos de ruta
│   └── index.ts
│
├── backend/                      # (Legacy) Puede ser eliminado/refactorizado
│   ├── repositories/
│   ├── services/                 # Puede moverse a /services
│   └── utils/                    # Puede moverse a /lib
│
├── frontend/                     # (Legacy) Puede ser eliminado/refactorizado
│   ├── actions/
│   ├── components/
│   └── layouts/
│
└── shared/                       # (Legacy) Puede ser consolidado en /types
    ├── constants/
    ├── types/
    └── validators/
```

## Cambios Principales

### 1. Route Groups (App Router)
- `(auth)`: Agrupa páginas de autenticación (login, register) con su propio layout
- `(protected)`: Agrupa rutas protegidas con validación de usuario en el layout
- `(auth)` en API: Agrupa endpoints de autenticación

### 2. Reorganización de Componentes
- **auth/**: Componentes relacionados con autenticación (LoginForm, RegisterForm)
- **chat/**: Componentes de chat
- **features/**: Componentes de características principales (ChatInterface)
- **map/**: Componentes relacionados con mapas (BusMarker, MapView, etc.)
- **common/**: Componentes reutilizables (Form, Header)
- **layouts/**: Layouts compartidos (AuthLayout, AdminNavbar)

### 3. Reorganización de lib
- **lib/auth/**: Utilidades de autenticación (JWT, password hashing)
- **lib/db/**: Configuración de Prisma
- **lib/maps/**: Utilidades de mapas
- **lib/utils/**: Utilidades generales

### 4. Servicios y Tipos
- **services/**: Servicios de negocio (auth, routes, AI)
- **types/**: Definiciones de tipos TypeScript organizadas por dominio

### 5. Importaciones Actualizadas
- Las importaciones ahora usan `@/components` en lugar de `@/frontend/components`
- Las importaciones de lib ahora usan `@/lib/auth` en lugar de `@/lib/auth.ts`
- Se han consolidado las acciones en `/src/actions`

## Ventajas de la Nueva Estructura

1. **Mejor Organización**: Componentes agrupados por feature
2. **Escalabilidad**: Fácil agregar nuevas features
3. **Mantenibilidad**: Código organizado y predecible
4. **Type Safety**: Tipos organizados por dominio
5. **Reutilización**: Componentes comunes centralizados
6. **Next.js 13+ Best Practices**: Uso de Route Groups y App Router

## Próximos Pasos

1. Migrar componentes existentes de `/frontend` a `/components`
2. Consolidar tipos de `/shared` a `/types`
3. Mover servicios de `/backend/services` a `/services`
4. Eliminar carpetas legacy (`/frontend`, `/backend`, `/shared`) cuando sea posible
5. Actualizar todas las importaciones en los archivos existentes

## Notas Importantes

- Los imports en archivos antiguos aún pueden referenciar las ubicaciones antiguas
- Se recomienda actualizar gradualmente las importaciones
- Mantener compatibilidad hacia atrás durante la transición
- Crear archivos index.ts en cada carpeta para facilitar las importaciones
