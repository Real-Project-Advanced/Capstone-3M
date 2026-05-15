// Types for Routes
export interface Route {
  id: string;
  name: string;
  startPoint: {
    name: string;
    lat: number;
    lng: number;
  };
  endPoint: {
    name: string;
    lat: number;
    lng: number;
  };
  distance: number;
  duration: number;
  color?: string;
  coordinates?: [number, number][];
  stops: Stop[];
}

export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  sequence: number;
}

export interface RouteCardProps {
  route: Route;
  onSelect?: (route: Route) => void;
}
