import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Geocode, Weather} from '../types';
import {environment} from "../environments/environment";

const baseUrl = 'https://api.openweathermap.org/';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(geocode: Geocode, units: string | null) {
    const params = new URLSearchParams({
      lat: geocode.lat.toString(),
      lon: geocode.lon.toString(),
      units: units || 'metric',
      appid: environment.apiKey,
    });
    return this.http.get<Weather>(`${baseUrl}/data/2.5/weather?${params.toString()}`)
  }

  getGeoCodes(query: string) {
    return this.http.get<Geocode[]>(`${baseUrl}/geo/1.0/direct?q=${query}&limit=5&appid=${environment.apiKey}`)
  }
}
