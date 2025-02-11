import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { enviroment } from '../../environments/environment';
import { GeocodingResponse } from '../interfaces/geocoding.interface';
import { WeatherResponse } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apikey = enviroment.weatherApi.key;
  private baseUrl = enviroment.weatherApi.baseUrl;
  private geoCodingUrl = enviroment.weatherApi.geocodingUrl;
  constructor(private http: HttpClient) { }

  getWeatherByCity(city:string): Observable<WeatherResponse | null> {
    return this.getCoordinates(city).pipe(
      switchMap(coordinates =>{
        if(!coordinates) return of(null);
        return this.getWeatherByCoordinates(coordinates.lat, coordinates.lon);
      }),
      catchError(()=>of(null))
    );
  }

  private getCoordinates(city: string ): Observable<GeocodingResponse | null> {
    const url = `${this.geoCodingUrl}?q=${encodeURIComponent(city)}&limit=1&appid=${this.apikey}`;
    return this.http.get<GeocodingResponse[]>(url).pipe(
      map(response => response[0] || null), 
      catchError(()=> of(null))
    );
  }

  private getWeatherByCoordinates(lat: number, lon:number) : Observable<WeatherResponse> {
    const url = `${this.baseUrl}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${this.apikey}`;
    return this.http.get<WeatherResponse>(url);
  }
}