export interface Geocode {
  lat: number
  lon: number
  country: string
  state: string
  name: string
  local_names: {
    [key: string]: string
  }
}

export interface Weather {
  lat: number
  lon: number
}
