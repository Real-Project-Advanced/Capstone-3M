import { Heart, MapPinned } from 'lucide-react'

export default function FavoritesPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="flex items-center gap-3 mb-2">
        <Heart className="w-7 h-7 text-purple-400" />
        <h1 className="text-3xl font-bold">Rutas favoritas</h1>
      </div>

      <p className="text-zinc-400 mb-8">
        Accede rápidamente a tus rutas más usadas.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-purple-500 transition">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Ruta 134</h2>
            <Heart className="w-5 h-5 fill-purple-500 text-purple-500" />
          </div>

          <div className="mt-4 flex items-center gap-2 text-zinc-400">
            <MapPinned className="w-4 h-4" />
            San Javier → Centro
          </div>
        </div>
      </div>
    </main>
  )
}
