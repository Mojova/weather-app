import {TestBed} from '@angular/core/testing';

import {WeatherService} from './weather.service';
import {HttpClient} from "@angular/common/http";
import {Geocode, Weather} from "../types";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

const expectedGeocodes: Geocode[] = [
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

describe('WeatherService', () => {
  let service: WeatherService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WeatherService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('returns geocodes', () => {
    service.getGeoCodes('London').subscribe(geocodes => {
      expect(geocodes[0].name).toEqual('London');
      expect(geocodes[1].name).toEqual('City of London');
    });
    const req = httpTestingController.expectOne((request) => {
      return request.method === 'GET' && request.url.includes('direct?q=London&limit=5&appid=');
    });
    req.flush(expectedGeocodes);
    httpTestingController.verify();
  });
  it('returns weather', () => {
    const expectedWeather: Weather = {
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
    service.getWeather(expectedGeocodes[0], 'metric').subscribe(weather => {
      expect(weather.id).toEqual(expectedWeather.id);
    });
    const req = httpTestingController.expectOne((request) => {
      return request.method === 'GET' && request.url.includes('weather?lat=51.5073219&lon=-0.1276474&units=metric&appid=');
    });
    req.flush(expectedWeather);
    httpTestingController.verify();
  });
});
