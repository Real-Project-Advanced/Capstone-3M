'use client'

import { Route } from '@/types/route'

type Props = {
  route: Route
}

export default function RouteCard({ route }: Props) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h2 className="font-bold">{route.name}</h2>

      <div
        className="mt-2 h-3 w-full rounded"
        style={{
          backgroundColor: route.color,
        }}
      />
    </div>
  )
}
