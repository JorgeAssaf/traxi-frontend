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
  coordinates: Array<number[] | number>
}

export interface Properties {
  name: null | string
  address: null | string
  type: string
}
