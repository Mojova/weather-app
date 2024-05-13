import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {WeatherService} from "../weather.service";
import {debounceTime, distinctUntilChanged, filter, Observable, switchMap} from "rxjs";
import {Geocode, SavedData, Weather} from "../../types";
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule, AsyncPipe, NgIf, MatRadioGroup, MatRadioButton, NgOptimizedImage,],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  geocodes$: Observable<Geocode[]>;
  city = new FormControl<Geocode | string>('');
  units = new FormControl('metric');
  weather$?: Observable<Weather>;

  constructor(private weatherService: WeatherService) {
    this.geocodes$ = this.city.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      filter((name) => !!name && typeof name === 'string'),
      switchMap(name => {
        // Value filtered above.
        // @ts-ignore
        return this.weatherService.getGeoCodes(name)
      }),
    )
    this.city.valueChanges.subscribe(value => {
      if (!value || typeof value === 'string') {
        return;
      }
      this.weather$ = this.weatherService.getWeather(value, this.units.value);
      this.save(value, this.units.value || 'metric');
    });
    this.units.valueChanges.subscribe(units => {
      if (!!units && !!this.city.value && typeof this.city.value !== 'string') {
        this.weather$ = this.weatherService.getWeather(this.city.value, units);
        this.save(this.city.value, units);
      }
    })
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('weather-app');
    if (saved) {
      const savedData: SavedData = JSON.parse(saved);
      if (savedData.geocode) {
        this.city.setValue(savedData.geocode);
      }
      this.units.setValue(savedData.units);
    }
  }

  save(geocode: Geocode, units: string) {
    const savedData = {
      geocode,
      units
    }
    localStorage.setItem('weather-app', JSON.stringify(savedData));
  }


  displayWith(geocode?: Geocode) {
    return geocode ? `${geocode.name}, ${geocode.country}` : '';
  }

  getTemperatureUnit() {
    if (this.units.value === 'imperial') {
      return '°F';
    }
    return '°C';
  }

  getWindSpeedUnit() {
    if (this.units.value === 'imperial') {
      return 'mph';
    }
    return 'm/h';
  }

  getWindDirection(direction: number) {
    if (direction >= 337.5 || direction < 22.5) {
      return 'North';
    }
    if (direction >= 22.5 && direction < 67.5) {
      return 'Northeast';
    }
    if (direction >= 67.5 && direction < 112.5) {
      return 'East';
    }
    if (direction >= 112.5 && direction < 157.5) {
      return 'Southeast';
    }
    if (direction >= 157.5 && direction < 202.5) {
      return 'South';
    }
    if (direction >= 202.5 && direction < 247.5) {
      return 'Southwest';
    }
    if (direction >= 247.5 && direction < 292.5) {
      return 'West';
    }
    return 'Northwest';
  }
}
