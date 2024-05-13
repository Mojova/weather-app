import {TestBed} from '@angular/core/testing';

import {SearchComponent} from './search.component';
import {userEvent} from "@testing-library/user-event";
import {render, screen} from "@testing-library/angular";
import {from, of} from "rxjs";
import {expectedGeocodes, expectedWeatherC, expectedWeatherF} from "../testdata";
import {WeatherService} from "../weather.service";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
// @ts-ignore
import JasmineDOM from '@testing-library/jasmine-dom';
import {Geocode} from "../../types";

describe('SearchComponent', () => {
  beforeAll(() => {
    // Custom matchers used by testing-library
    jasmine.addMatchers(JasmineDOM);
  });

  beforeEach(async () => {
    localStorage.clear();
    const weatherService = jasmine.createSpyObj('WeatherService', ['getGeoCodes', 'getWeather']);
    weatherService.getGeoCodes.and.returnValue(of(expectedGeocodes));
    weatherService.getWeather.and.callFake((geocode: Geocode, unit: string) => {
      if (unit === 'metric') {
        return of(expectedWeatherC);
      } else if (unit === 'imperial') {
        return of(expectedWeatherF);
      }
      return null;
    });
    await TestBed.configureTestingModule({
      imports: [SearchComponent, NoopAnimationsModule],
      providers: [{provide: WeatherService, useValue: weatherService}]
    })
      .compileComponents();
  });

  it('looks up weather', async () => {
    const user = userEvent.setup();
    await render(SearchComponent);
    const input = screen.getByLabelText('City')
    await user.type(input, 'London');
    const london = await screen.findByText('London, GB');
    expect(london).toBeInTheDocument();
    expect(await screen.findByText('City of London, GB')).toBeInTheDocument();
    await user.click(london)
    expect(await screen.findByText('Description')).toBeInTheDocument();
    expect(await screen.findByText('overcast clouds')).toBeInTheDocument();
    expect(await screen.findByText('Temperature')).toBeInTheDocument();
    expect(await screen.findByText('13.5 °C')).toBeInTheDocument();
    expect(await screen.findByText('Min')).toBeInTheDocument();
    expect(await screen.findByText('12.57 °C')).toBeInTheDocument();
    expect(await screen.findByText('Max')).toBeInTheDocument();
    expect(await screen.findByText('14.43 °C')).toBeInTheDocument();
    expect(await screen.findByText('Wind')).toBeInTheDocument();
    expect(await screen.findByText('3.6 m/h Southwest')).toBeInTheDocument();
    // Switch to imperial units, should refetch
    await user.click(screen.getByLabelText('Imperial'));
    expect(await screen.findByText('56.3 °F')).toBeInTheDocument();
    expect(await screen.findByText('54.6 °F')).toBeInTheDocument();
    expect(await screen.findByText('57.97 °F')).toBeInTheDocument();
    expect(await screen.findByText('8.05 mph Southwest')).toBeInTheDocument();
  });
  it('converts degrees to directions', () => {
    const component = TestBed.createComponent(SearchComponent).componentInstance;
    expect(component.getWindDirection(0)).toBe('North');
    expect(component.getWindDirection(45)).toBe('Northeast');
    expect(component.getWindDirection(90)).toBe('East');
    expect(component.getWindDirection(135)).toBe('Southeast');
    expect(component.getWindDirection(180)).toBe('South');
    expect(component.getWindDirection(225)).toBe('Southwest');
    expect(component.getWindDirection(270)).toBe('West');
    expect(component.getWindDirection(315)).toBe('Northwest');
  });
});
