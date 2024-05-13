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
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  wind: {
    speed: number
    direction: number
  }
  weather: WeatherDescription[]
}

interface WeatherDescription {
  id: number
  main: string
  description: string
  icon: string
}

export interface SavedData {
  geocode?: Geocode
  units: string
}
