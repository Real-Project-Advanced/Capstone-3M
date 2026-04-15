# Guía Base del Proyecto

Aqui se explica **cómo está organizado el proyecto** y **qué herramientas usamos**, para que todos trabajemos de forma consistente como un equipo bien organizado e informado.

---

# ⚙️ Herramientas del Proyecto

## 🧹 ESLint

**¿Qué es?**
Es una herramienta que revisa tu código y detecta errores o malas prácticas.

**¿Para qué sirve?**

* Evitar bugs antes de ejecutar el código
* Mantener buenas prácticas
* Asegurar calidad

**Ejemplo:**
Te avisa si declaras variables que no usas o si haces cosas incorrectas.

---

## 🎨 Prettier

**¿Qué es?**
Formatea el código automáticamente.

**¿Para qué sirve?**

* Hace que TODO el código tenga el mismo estilo
* Evita discusiones tipo: “¿lleva espacios o no?”

---

## 🐶 Husky

**¿Qué es?**
Ejecuta tareas automáticamente antes de hacer commit.

**¿Qué hace en este proyecto?**

* Corre ESLint antes de cada commit
* Si hay errores → NO te deja hacer commit

**Importante:**

> No puedes subir código roto al repositorio

---

# 🧱 Arquitectura del Proyecto

Todo el código vive dentro de:

```
src/
```

---

## 🧠 `app/` → Frontend + Backend

Aquí vive lo principal del proyecto (Next.js).

```
app/
├── page.tsx        → Página principal (UI)
├── api/            → Endpoints (backend)
```

**Ejemplo:**

* UI del mapa → aquí
* Endpoint de IA → aquí

---

## 🧩 `components/` → UI reutilizable

Componentes visuales que se pueden usar varias veces.

```
components/
├── Map.tsx
├── SearchBar.tsx
├── RouteCard.tsx
```

**Regla:**

> Aquí NO va lógica compleja, solo UI

---

## 🧠 `lib/` → Lógica del sistema

Aquí vive lo importante del proyecto.

```
lib/
├── ai/     → IA (Ollama, RAG, agentes)
├── db/     → conexiones a bases de datos
├── utils/  → funciones auxiliares
```

---

### 🤖 `lib/ai/`

* Conexión con modelo IA
* Generación de respuestas
* (futuro) RAG y agentes

---

### 🗄️ `lib/db/`

* Conexión a DB
* Conexión a MongoDB
* Vector DB

---

### 🔧 `lib/utils/`

Funciones pequeñas reutilizables:

* cálculos
* helpers

---

## 🧾 `types/` → Tipos de datos

Define cómo son los datos en todo el sistema.

```
types/
├── ruta.ts
├── usuario.ts
```

**Ejemplo:**

```
type Ruta = {
  id: string
  nombre: string
  paradas: string[]
}
```

---

## ⚙️ `actions/` → Server Actions

Funciones del backend que se pueden llamar desde el frontend.

```
actions/
├── crearRuta.ts
├── obtenerRutas.ts
```

---

# 🔀 Flujo básico del sistema

1. Usuario interactúa con la UI (`app/`)
2. Se llama a backend (`api/` o `actions/`)
3. Se usa lógica (`lib/`)
4. Se consultan datos (`db/`)
5. Se devuelve respuesta al frontend

---

# 🚨 Reglas del Equipo

* ❌ No usar `any` en TypeScript
* ❌ No hacer push directo a `main` o `develop`
* ✅ Todo va por Pull Request
* ✅ Código limpio (ESLint + Prettier obligatorio)
* ✅ Separar UI de lógica

---

# 🎯 Objetivo

Construir una plataforma inteligente de rutas de buses en Medellín usando:

* Fullstack moderno (Next.js + TypeScript)
* IA local (Ollama)
* Arquitectura profesional

---

Este README es la base.
Si todos seguimos estas reglas, el proyecto escalará sin volverse un caos.
