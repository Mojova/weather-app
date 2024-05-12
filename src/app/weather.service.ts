import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Geocode, Weather} from '../types';
import {environment} from "../environments/environment";

const baseUrl = 'http://api.openweathermap.org/';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather() {
    return this.http.get<Weather>(`${baseUrl}/api/weather`)
  }

  getGeoCodes(query: string) {
    return this.http.get<Geocode[]>(`${baseUrl}/geo/1.0/direct?q=${query}&limit=5&appid=${environment.apiKey}`)
  }
}
