import {Geocode, Weather} from "../types";

export const expectedGeocodes: Geocode[] = [
  {
    "name": "London",
    "local_names": {
      "en": "London"
    },
    "lat": 51.5073219,
    "lon": -0.1276474,
    "country": "GB",
    "state": "England"
  },
  {
    "name": "City of London",
    "local_names": {
      "en": "City of London"
    },
    "lat": 51.5156177,
    "lon": -0.0919983,
    "country": "GB",
    "state": "England"
  }
];

export const expectedWeatherC: Weather = {
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }
  ],
  "main": {
    "temp": 13.5,
    "feels_like": 13.02,
    "temp_min": 12.57,
    "temp_max": 14.43,
    "pressure": 1008,
    "humidity": 81
  },
  "wind": {
    "speed": 3.6,
    "deg": 210
  },
  id:	2643743,
}

export const expectedWeatherF: Weather = {
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }
  ],
  "main": {
    "temp": 56.3,
    "feels_like": 13.02,
    "temp_min": 54.6,
    "temp_max": 57.97,
    "pressure": 1008,
    "humidity": 81
  },
  "wind": {
    "speed": 8.05,
    "deg": 210
  },
  id:	2643743,
}
