export interface Coords {
  type: string
  features: Feature[]
}

export interface Feature {
  type: string
  geometry: Geometry
  properties: Properties
}

export interface Geometry {
  type: string
  coordinates: Array<number>
}

export interface Properties {
  name: null | string
  address: null | string
  type: string
}


export interface CarMockWithCoords {
  placa: string
  ['numero economico']: string
  vim: string
  asientos: number
  seguro: string
  ['segure numebr']: string
  BRAND: string
  MODEL: string
  YEAR: number
  COLOR: string
  coords: {
    lat: number
    lng: number
  }
}
