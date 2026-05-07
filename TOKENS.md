# Sistema de Autenticación con Access & Refresh Tokens

## 🎯 Descripción

Se implementó un sistema robusto de autenticación usando **Access Tokens** (corta duración) y **Refresh Tokens** (larga duración), mejorando la seguridad y escalabilidad de la aplicación.

## 📋 Cambios Realizados

### 1. **Actualización de `src/lib/auth.ts`**

**Nuevas funciones:**
- `generateAccessToken()` - Genera JWT con expiración corta (15 minutos)
- `generateRefreshToken()` - Genera JWT con expiración larga (7 días)
- `generateTokens()` - Retorna par de tokens
- `verifyAccessToken()` - Valida access token
- `verifyRefreshToken()` - Valida refresh token
- `setAuthCookies(tokens)` - Guarda ambos tokens en cookies
- `getAccessToken()` - Obtiene access token de cookies
- `getRefreshToken()` - Obtiene refresh token de cookies
- `clearAuthCookies()` - Limpia ambos tokens
- `refreshUserTokens()` - Genera nuevos tokens usando refresh token

**Configuración de cookies:**
- `accessToken`: httpOnly, Secure, 15 minutos
- `refreshToken`: httpOnly, Secure, 7 días

### 2. **Actualización de Server Actions**

**`src/frontend/actions/auth.actions.ts`:**
```typescript
// Ahora usa generateTokens() y setAuthCookies()
const tokens = generateTokens(userPayload);
await setAuthCookies(tokens);
```

**`src/frontend/actions/register.actions.ts`:**
```typescript
// Mismo patrón que login
const tokens = generateTokens(userPayload);
await setAuthCookies(tokens);
```

### 3. **Refactorización de `AuthService`**

**Cambio importante:**
- Ya no genera tokens (responsabilidad movida a Server Actions)
- Solo retorna `{ user: UserPayload }`
- La lógica de tokens se mantiene en la capa de presentación

### 4. **Nuevos API Routes**

**`src/app/api/auth/refresh/route.ts`** ✨
```
POST /api/auth/refresh
- Usa refresh token para generar nuevos tokens
- Retorna nuevo access token
- Invalida tokens expirados
```

**`src/app/api/auth/logout/route.ts`** (Actualizado)
```
POST /api/auth/logout
- Limpia accessToken y refreshToken
- Retorna respuesta JSON en lugar de redireccionar
```

### 5. **Middleware Mejorado**

**`middleware.ts`** - Auto-refresco de tokens:
```typescript
// Si accessToken expiró pero refreshToken es válido:
1. Intenta refrescar tokens automáticamente
2. Si refresh falla, redirige a /auth/login
3. Si refresh éxito, continúa la solicitud
```

### 6. **Variables de Entorno**

**`.env`** - Nuevas variables:
```env
JWT_SECRET="NEXTHUS_NEOSYNK_SECRET"
JWT_REFRESH_SECRET="NEXTHUS_NEOSYNK_REFRESH_SECRET"
ACCESS_TOKEN_EXPIRES_IN="15m"
REFRESH_TOKEN_EXPIRES_IN="7d"
```

## 🔄 Flujo de Autenticación

### Login
```
1. Usuario ingresa credenciales
2. Server Action valida credenciales
3. AuthService retorna datos del usuario
4. Server Action genera Access + Refresh tokens
5. Ambos tokens se guardan en cookies httpOnly
6. Redirige a /admin/dashboard
```

### Auto-Refresco (Middleware)
```
1. Usuario con accessToken expirado intenta acceder a ruta protegida
2. Middleware detecta token inválido
3. Intenta refrescar usando refreshToken
4. Si éxito: genera nuevos tokens y continúa
5. Si fallo: redirige a /auth/login
```

### Logout
```
1. Usuario hace POST a /api/auth/logout
2. Se eliminan ambas cookies
3. Se retorna JSON { success: true }
4. Cliente redirige a /auth/login (opcional)
```

## 🔐 Seguridad

✅ **HTTP-Only Cookies**: Tokens no accesibles desde JavaScript
✅ **Secure Flag**: Solo se envían por HTTPS en producción
✅ **SameSite=Lax**: Protección contra CSRF
✅ **Corta Duración (Access)**: 15 minutos para minimizar daño si se compromete
✅ **Larga Duración (Refresh)**: 7 días para mejor UX
✅ **Secretos Separados**: JWT_SECRET ≠ JWT_REFRESH_SECRET

## 📱 Uso en el Cliente

### Refrescar tokens manualmente
```typescript
const response = await fetch('/api/auth/refresh', {
  method: 'POST',
});
const data = await response.json();
```

### Logout
```typescript
const response = await fetch('/api/auth/logout', {
  method: 'POST',
});
if (response.ok) {
  window.location.href = '/auth/login';
}
```

## 🧪 Verificación de Tokens en Cookies

En el navegador (DevTools -> Application -> Cookies):
- `accessToken`: contiene JWT de 15 minutos
- `refreshToken`: contiene JWT de 7 días

Ambas cookies deben tener:
- ✅ httpOnly: true
- ✅ Secure: true (en producción)
- ✅ SameSite: Lax
- ✅ Path: /

## 📊 Comparación Antes vs Después

### ANTES
```
❌ Un solo token (confuso si era access o refresh)
❌ Duración fija sin opciones
❌ Sin mecanismo de auto-refresco
❌ Logout no limpiar ambos tokens
```

### DESPUÉS
```
✅ Access Token (15m) + Refresh Token (7d)
✅ Auto-refresco en middleware
✅ Logout limpia ambos tokens
✅ Mejor seguridad y UX
✅ Extensible a multi-device sessions
```

## 🚀 Próximas Mejoras

1. **Blacklist de Tokens**
   - Guardar tokens revocados en cache (Redis)
   - Invalidar inmediatamente en logout

2. **Rotación de Tokens**
   - Cambiar secrets periódicamente
   - Invalidar tokens antiguos

3. **Multi-Device Sessions**
   - Guardar sesiones activas en BD
   - Logout desde otro dispositivo
   - Dashboard de dispositivos

4. **Rate Limiting**
   - Limitar intentos fallidos de login
   - Proteger endpoint de refresh

5. **2FA / MFA**
   - Autenticación de dos factores
   - Códigos TOTP

## 📁 Archivos Modificados/Creados

### Modificados
- `src/lib/auth.ts` - Nuevo sistema de tokens
- `src/frontend/actions/auth.actions.ts` - Usa nuevo sistema
- `src/frontend/actions/register.actions.ts` - Usa nuevo sistema
- `src/backend/services/auth.service.ts` - Simplificado
- `src/app/api/auth/logout/route.ts` - Mejorado
- `middleware.ts` - Auto-refresco
- `tsconfig.json` - Limpieza
- `.env` - Nuevas variables

### Creados
- `src/app/api/auth/refresh/route.ts` - Nuevo endpoint

## ✨ Estado

✅ Compilación exitosa
✅ Todos los endpoints funcionando
✅ Middleware ejecutándose correctamente
✅ Cookies guardándose en httpOnly
