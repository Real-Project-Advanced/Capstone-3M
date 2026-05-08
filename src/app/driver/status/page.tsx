export default function DriverStatusPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-3xl font-bold">Estado del conductor</h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mt-8 max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Estado actual</h2>
            <p className="text-zinc-400 mt-2">
              El conductor está actualmente en servicio.
            </p>
          </div>

          <div className="bg-green-500/20 text-green-400 px-5 py-2 rounded-xl border border-green-500/30">
            Activo
          </div>
        </div>
      </div>
    </main>
  )
}
