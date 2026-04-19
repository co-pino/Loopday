# Loopday

> App móvil para ejecutar una tarea diaria mediante rachas y fricción psicológica.

---

## ¿Qué es esto?

Loopday no es un gestor de tareas. No es un coach. No es un sistema inteligente que se adapta a ti.

Es una herramienta que te obliga a cumplir **una sola cosa al día** — la que tú misma dijiste que harías.

Sin listas. Sin prioridades. Sin planificación. Solo el loop:

```
abrir app → escribir tarea → iniciar → terminar → ver racha → cerrar app
```

Si ese loop no es ridículamente fácil, fallamos.

---

## El problema real

No hay problema de información ni de organización.

El problema es que sabes lo que tienes que hacer, lo escribes, lo planificas... y no lo haces.

La mayoría de las apps de productividad te ayudan a organizar mejor tus pendientes. Loopday existe para que ejecutes aunque no tengas ganas.

---

## ¿Cómo funciona?

### 1. Una tarea al día
Defines una sola tarea. Suficientemente pequeña para no generar rechazo. Opcional: escribes por qué importa y cuánto tiempo le vas a dedicar.

### 2. Modo ejecución
Presionas **Iniciar**. Empieza el temporizador. No puedes marcar como completado antes de cumplir el tiempo mínimo — el único mecanismo técnico de la app.

### 3. El sistema de racha y saldo
- Completas → racha sube, saldo sube
- Te distraes → saldo baja
- No completas un día → racha vuelve a cero

La motivación no es ganar. Es **no perder lo que ya tienes**.

### 4. Evidencia simple
```
5 de los últimos 7 días ✓
120 minutos acumulados
Racha actual: 4 días
```

Nada más. Sin dashboards. Sin gráficos de Excel.

---

## MVP — Lo que se construye primero

El MVP valida una sola cosa:

> **¿Alguien vuelve mañana sin que lo obligues?**

### Pantallas
| Pantalla | Descripción |
|---|---|
| `Home` | Estado del día: tarea activa o botón para crear una |
| `CrearTarea` | Nombre, por qué, tiempo mínimo |
| `Timer` | Temporizador activo + botón Completé (bloqueado) + Me distraje |
| `Resultado` | Feedback de éxito o confrontación suave |
| `Stats` | Racha, saldo, últimos 7 días, minutos acumulados |

### Stack
- **React Native** con Expo
- **TypeScript**
- **AsyncStorage** para persistencia local (sin backend en MVP)
- **expo-notifications** para recordatorio diario
- **expo-router** para navegación

### Lo que NO está en el MVP (a propósito)
- ❌ Backend
- ❌ Autenticación
- ❌ Múltiples tareas
- ❌ Checkpoints durante ejecución
- ❌ Adaptación automática de dificultad
- ❌ Penalizaciones complejas

Cada cosa que no está es una decisión, no un olvido.

---

## Roadmap — A dónde escala esto

### v0.2 — Backend y cuentas
- Spring Boot (monolito) + PostgreSQL
- Registro e inicio de sesión
- Sincronización de datos entre dispositivos
- Historial completo en base de datos

### v0.3 — Dinero real (opcional por usuario)
- Integración con pasarela de pago
- El usuario deposita un monto que pierde si rompe la racha
- Retiro disponible al completar el periodo elegido

### v0.4 — Social mínimo
- Compartir racha (sin redes sociales, solo link)
- Modo accountability: un contacto recibe notificación si fallas

### v0.5 — iOS
- Publicación en App Store
- Revisión de permisos y adaptaciones de plataforma

### Largo plazo
- API pública para integraciones
- Versión web para definir la tarea desde el computador

---

## Estructura del proyecto

```
FocusOne/
├── app/                  # Pantallas (expo-router)
│   ├── index.tsx         # Home
│   ├── crear-tarea.tsx
│   ├── timer.tsx
│   ├── resultado.tsx
│   └── stats.tsx
├── components/           # Componentes reutilizables
├── hooks/                # Lógica reutilizable
│   ├── useStats.ts       # Racha y saldo
│   └── useNotifications.ts
├── storage/              # Capa de AsyncStorage
│   └── index.ts
├── constants/            # Colores, textos, config
│   └── colors.ts
└── docs/                 # Diagramas y documentación
    ├── flujo-navegacion.png
    └── modelo-datos-local.png
```

---

## Sprints

| Sprint | Contenido | Estado |
|---|---|---|
| Sprint 0 | Setup, estructura, GitHub | ✅ En progreso |
| Sprint 1 | Flujo central (4 pantallas) | ⬜ Pendiente |
| Sprint 2 | Persistencia, racha, saldo | ⬜ Pendiente |
| Sprint 3 | UX mínima, notificaciones | ⬜ Pendiente |

---

## Principio de diseño

> Cada clic extra reduce la probabilidad de que el usuario actúe.

La app compite contra la pereza, la distracción y la baja energía — no contra otras apps.

Cada decisión de diseño se evalúa con una pregunta: **¿esto hace más fácil empezar, o más difícil?**

---

## Desarrollo local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/loopday.git
cd loopday

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npx expo start
```

Escanea el QR con **Expo Go** en tu celular.

---

*Construido con React Native + Expo.*