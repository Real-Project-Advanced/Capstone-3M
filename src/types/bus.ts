// Types for Bus
export interface Bus {
  id: string;
  plate: string;
  model: string;
  capacity: number;
  location: {
    lat: number;
    lng: number;
  };
  routeId?: string | number;
}

export interface BusMarkerProps {
  bus: Bus;
  onSelect?: (bus: Bus) => void;
}
