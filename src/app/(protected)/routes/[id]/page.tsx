import { MapPinned, Clock3, BusFront } from 'lucide-react'

export default function RouteDetailsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Ruta 134</h1>
            <p className="text-zinc-400 mt-2">San Javier → Centro</p>
          </div>

          <div className="bg-purple-600 px-4 py-2 rounded-xl font-medium">
            Activa
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-zinc-800 rounded-2xl p-5">
            <MapPinned className="w-6 h-6 text-purple-400 mb-3" />
            <h2 className="font-semibold">Paradas</h2>
            <p className="text-zinc-400 mt-2">18 estaciones</p>
          </div>

          <div className="bg-zinc-800 rounded-2xl p-5">
            <Clock3 className="w-6 h-6 text-purple-400 mb-3" />
            <h2 className="font-semibold">Tiempo estimado</h2>
            <p className="text-zinc-400 mt-2">15 minutos</p>
          </div>

          <div className="bg-zinc-800 rounded-2xl p-5">
            <BusFront className="w-6 h-6 text-purple-400 mb-3" />
            <h2 className="font-semibold">Buses activos</h2>
            <p className="text-zinc-400 mt-2">6 buses</p>
          </div>
        </div>
      </div>
    </main>
  )
}
