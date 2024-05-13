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
    deg: number
  }
  weather: WeatherDescription[]
  id: number
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
