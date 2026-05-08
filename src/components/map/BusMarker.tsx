'use client'

import { Marker, Popup } from 'react-leaflet'
import { Bus } from '@/types/bus'

type Props = {
  bus: Bus
}

export default function BusMarker({ bus }: Props) {
  return (
    <Marker position={[bus.latitude, bus.longitude]}>
      <Popup>
        <div>
          <h2>{bus.plate}</h2>
          <p>Ruta: {bus.routeId}</p>
        </div>
      </Popup>
    </Marker>
  )
}
