# Guía de Limpieza Post-Refactorización

## Directorios que Pueden Eliminarse o Consolidarse

### 1. Eliminación de carpetas legacy
Una vez que hayas validado que toda la funcionalidad está migrada, puedes eliminar:

```bash
# Carpetas que pueden ser eliminadas
rm -rf src/frontend/
rm -rf src/backend/
rm -rf src/site/
```

### 2. Consolidación de shared
Ahora que `shared/types` se ha movido a `types/`, puedes considerar:

```bash
# Primero, asegúrate de que shared/validators esté migrado
# Luego:
rm -rf src/shared/
```

### 3. Pasos para Limpiar Gradualmente

#### Paso 1: Validar que todas las importaciones están actualizadas
```bash
# Busca referencias antiguas
grep -r "@/frontend/" src/
grep -r "@/backend/" src/
grep -r "@/site/" src/
```

#### Paso 2: Actualizar archivos que aún referencian ubicaciones antiguas
Busca y reemplaza:
- `@/frontend/` → `@/`
- `@/backend/` → `@/lib/` o `@/services/`
- `@/shared/` → `@/types/` o `@/lib/`

#### Paso 3: Verificar que todo compila
```bash
npm run build
```

#### Paso 4: Ejecutar tests
```bash
npm test
```

#### Paso 5: Eliminar directorios legacy
Una vez que todo funcione correctamente:
```bash
rm -rf src/frontend/
rm -rf src/backend/
rm -rf src/shared/
rm -rf src/site/
```

## Estructura Estable

Después de limpiar, tu estructura será:

```
src/
├── app/                  # Páginas y rutas
├── components/           # Componentes organizados por feature
├── lib/                  # Utilidades y configuración
├── services/             # Lógica de negocio
├── types/                # Definiciones de tipos
├── actions/              # Server actions
└── generated/            # Archivos generados (Prisma)
```

## Checklist de Migración

- [ ] Todos los imports en archivos actuales están actualizados
- [ ] El proyecto compila sin errores
- [ ] Los tests pasan
- [ ] Las páginas funcionan correctamente
- [ ] Los componentes se renderizan correctamente
- [ ] Se ha validado la estructura en producción
- [ ] Se han eliminado las carpetas legacy

## Comandos Útiles

```bash
# Ver estructura de carpetas
tree -L 3 -I 'node_modules|.next'

# Buscar referencias antiguas
grep -r "from '@/frontend/" src/
grep -r "from '@/backend/" src/
grep -r "from '@/shared/" src/

# Build
npm run build

# Test
npm test

# Type check
npm run type-check
```

## Notas Importantes

- **No elimines **gradualmente** - Si es posible, mantén las carpetas antiguas como referencia durante un tiempo
- **Haz commits regulares** después de cada actualización
- **Valida en desarrollo** antes de actualizar en producción
- **Considera mantener un branch de respaldo** durante la transición
