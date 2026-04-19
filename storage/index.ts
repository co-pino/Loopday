import AsyncStorage from '@react-native-async-storage/async-storage'

// ─── Tipos ───────────────────────────────────────────────

export type StatusTarea = 'activa' | 'completada' | 'fallada'
export type StatusDia = 'completada' | 'fallada' | 'sin_tarea'

export interface TareaHoy {
  id: string
  descripcion: string
  porQue?: string
  tiempoMinimo: number
  fechaCreacion: string
  status: StatusTarea
  tiempoReal?: number
}

export interface EntradaHistorial {
  fecha: string
  status: StatusDia
  descripcion: string
  tiempoReal: number
}

export interface UserStats {
  rachaActual: number
  rachaMaxima: number
  saldo: number
  totalCompletadas: number
  minutosAcumulados: number
}

// ─── Claves ──────────────────────────────────────────────

const KEYS = {
  tareaHoy: '@tarea_hoy',
  historial: '@historial',
  userStats: '@user_stats',
}

// ─── TareaHoy ────────────────────────────────────────────

export async function guardarTareaHoy(tarea: TareaHoy): Promise<void> {
  await AsyncStorage.setItem(KEYS.tareaHoy, JSON.stringify(tarea))
}

export async function obtenerTareaHoy(): Promise<TareaHoy | null> {
  const data = await AsyncStorage.getItem(KEYS.tareaHoy)
  return data ? JSON.parse(data) : null
}

// ─── Historial ───────────────────────────────────────────

export async function guardarResultadoDia(
  fecha: string,
  status: StatusDia,
  descripcion: string,
  tiempoReal: number
): Promise<void> {
  const historial = await obtenerHistorial()
  const nueva: EntradaHistorial = { fecha, status, descripcion, tiempoReal }
  const actualizado = [nueva, ...historial].slice(0, 30)
  await AsyncStorage.setItem(KEYS.historial, JSON.stringify(actualizado))
}

export async function obtenerHistorial(): Promise<EntradaHistorial[]> {
  const data = await AsyncStorage.getItem(KEYS.historial)
  return data ? JSON.parse(data) : []
}

// ─── UserStats ───────────────────────────────────────────

const STATS_INICIALES: UserStats = {
  rachaActual: 0,
  rachaMaxima: 0,
  saldo: 0,
  totalCompletadas: 0,
  minutosAcumulados: 0,
}

export async function obtenerStats(): Promise<UserStats> {
  const data = await AsyncStorage.getItem(KEYS.userStats)
  return data ? JSON.parse(data) : STATS_INICIALES
}

export async function actualizarStats(cambios: Partial<UserStats>): Promise<void> {
  const actual = await obtenerStats()
  const actualizado = { ...actual, ...cambios }
  await AsyncStorage.setItem(KEYS.userStats, JSON.stringify(actualizado))
}

// ─── Resetear día ────────────────────────────────────────

export async function resetearDia(): Promise<void> {
  const hoy = new Date().toISOString().split('T')[0]
  const tarea = await obtenerTareaHoy()

  if (tarea && tarea.fechaCreacion !== hoy) {
    if (tarea.status === 'activa') {
      await guardarResultadoDia(tarea.fechaCreacion, 'fallada', tarea.descripcion, 0)
      const stats = await obtenerStats()
      await actualizarStats({
        rachaActual: 0,
        saldo: Math.max(0, stats.saldo - 50),
      })
    }
    await AsyncStorage.removeItem(KEYS.tareaHoy)
  }
}