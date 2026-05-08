'use client'

import { Polyline } from 'react-leaflet'
import { Route } from '@/types/route'

type Props = {
  route: Route
}

export default function RoutePolyline({ route }: Props) {
  return (
    <Polyline
      positions={route.coordinates}
      pathOptions={{
        color: route.color,
        weight: 5,
      }}
    />
  )
}
