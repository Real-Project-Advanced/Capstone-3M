export default function DriverDashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-3xl font-bold">Panel del Conductor</h1>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-zinc-400">Ruta Asignada</h2>
          <p className="text-3xl font-bold mt-3">Ruta 134</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-zinc-400">Estado</h2>
          <p className="text-green-400 text-2xl font-bold mt-3">En servicio</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-zinc-400">Pasajeros</h2>
          <p className="text-3xl font-bold mt-3">24</p>
        </div>
      </div>
    </main>
  )
}
