export default function AdminPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-3xl font-bold">Panel Administrativo</h1>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-zinc-400">Conductores</h2>
          <p className="text-4xl font-bold mt-3">18</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-zinc-400">Buses</h2>
          <p className="text-4xl font-bold mt-3">12</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-zinc-400">Rutas</h2>
          <p className="text-4xl font-bold mt-3">34</p>
        </div>
      </div>
    </main>
  )
}
