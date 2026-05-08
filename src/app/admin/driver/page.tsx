export default function AdminDriversPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Conductores</h1>

        <button className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl font-medium transition">
          Crear conductor
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <h2 className="font-semibold">Carlos Ramírez</h2>
          <p className="text-zinc-400 mt-2">Ruta asignada: Ruta 134</p>
        </div>
      </div>
    </main>
  )
}
