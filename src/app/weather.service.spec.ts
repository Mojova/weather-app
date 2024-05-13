import {TestBed} from '@angular/core/testing';

import {WeatherService} from './weather.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {expectedGeocodes, expectedWeatherC} from "./testdata";

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WeatherService);
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
    service.getWeather(expectedGeocodes[0], 'metric').subscribe(weather => {
      expect(weather.id).toEqual(expectedWeatherC.id);
    });
    const req = httpTestingController.expectOne((request) => {
      return request.method === 'GET' && request.url.includes('weather?lat=51.5073219&lon=-0.1276474&units=metric&appid=');
    });
    req.flush(expectedWeatherC);
    httpTestingController.verify();
  });
});
