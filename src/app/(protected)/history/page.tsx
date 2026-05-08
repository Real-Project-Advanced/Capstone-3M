import { Clock3 } from 'lucide-react'

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="flex items-center gap-3 mb-2">
        <Clock3 className="w-7 h-7 text-purple-400" />
        <h1 className="text-3xl font-bold">Historial</h1>
      </div>

      <p className="text-zinc-400 mb-8">
        Historial de búsquedas y consultas realizadas.
      </p>

      <div className="space-y-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <p className="font-medium">Buscar ruta hacia Laureles</p>
          <span className="text-sm text-zinc-500 mt-2 block">
            Hace 10 minutos
          </span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <p className="font-medium">Consulta de buses cercanos</p>
          <span className="text-sm text-zinc-500 mt-2 block">
            Hace 35 minutos
          </span>
        </div>
      </div>
    </main>
  )
}
