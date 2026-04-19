import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useEffect } from 'react'
import { guardarTareaHoy, obtenerTareaHoy, obtenerStats, obtenerHistorial } from './storage'


export default function App() {
  useEffect(() => {
    const probar = async () => {
      await guardarTareaHoy({
        id: '1',
        descripcion: 'Terminar pantalla home',
        tiempoMinimo: 10,
        fechaCreacion: new Date().toISOString().split('T')[0],
        status: 'activa',
      })
      const tarea = await obtenerTareaHoy()
      console.log('tarea:', tarea)

      const stats = await obtenerStats()
      console.log('stats:', stats)

      const historial = await obtenerHistorial()
      console.log('historial:', historial)
    }
    probar()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})