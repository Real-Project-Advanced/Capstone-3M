export default function AdminRoutesPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Administrar rutas</h1>

        <button className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl font-medium transition">
          Crear ruta
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex justify-between items-center">
          <div>
            <h2 className="font-semibold">Ruta 134</h2>
            <p className="text-zinc-400 mt-1">San Javier → Centro</p>
          </div>

          <button className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl">
            Editar
          </button>
        </div>
      </div>
    </main>
  )
}
