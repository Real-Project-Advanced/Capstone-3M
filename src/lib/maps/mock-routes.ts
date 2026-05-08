import { Route } from '@/types/route'

export const mockRoutes: Route[] = [
  {
    id: 1,
    name: 'Ruta Centro',
    color: 'blue',
    coordinates: [
      [6.2442, -75.5812],
      [6.245, -75.5805],
      [6.246, -75.579],
      [6.247, -75.5775],
      [6.2485, -75.576],
      [6.25, -75.5745],
      [6.252, -75.573],
    ],
  },

  {
    id: 2,
    name: 'Ruta Poblado',
    color: 'red',
    coordinates: [
      [6.21, -75.57],
      [6.22, -75.565],
      [6.23, -75.56],
    ],
  },
]
