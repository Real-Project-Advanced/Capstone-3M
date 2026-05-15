import { Route } from '@/types/route'

export const mockRoutes: Route[] = [
  {
    id: "1",
    name: 'Ruta Centro',
    startPoint: { name: 'Terminal Norte', lat: 6.2842, lng: -75.5612 },
    endPoint: { name: 'Parque Berrío', lat: 6.2442, lng: -75.5812 },
    distance: 5.5,
    duration: 20,
    stops: []
  },
  {
    id: "2",
    name: 'Ruta Poblado',
    startPoint: { name: 'Parque Poblado', lat: 6.21, lng: -75.57 },
    endPoint: { name: 'Parque Lleras', lat: 6.20, lng: -75.56 },
    distance: 2.5,
    duration: 10,
    stops: []
  }
]
