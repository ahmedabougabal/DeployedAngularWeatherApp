import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { GeocodingResponse } from '../interfaces/geocoding.interface';
import { WeatherResponse } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = enviroment.weatherApi.key;

  constructor(private http: HttpClient) { }

  getWeatherByCity(city: string): Observable<WeatherResponse | null> {
    console.log('Searching for city:', city);
    return this.getCoordinates(city).pipe(
      tap(coordinates => console.log('Coordinates response:', coordinates)),
      switchMap(coordinates => {
        if (!coordinates) {
          console.log('No coordinates found for city');
          return of(null);
        }
        return this.getWeatherByCoordinates(coordinates.lat, coordinates.lon);
      }),
      tap(weather => console.log('Weather response:', weather)),
      catchError(error => {
        console.error('Error in getWeatherByCity:', error);
        return of(null);
      })
    );
  }

  private getCoordinates(city: string): Observable<GeocodingResponse | null> {
    const url = `/api/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${this.apiKey}`;
    console.log('Geocoding URL:', url);
    return this.http.get<GeocodingResponse[]>(url).pipe(
      tap(response => console.log('Raw geocoding response:', response)),
      map(response => response[0] || null),
      catchError(error => {
        console.error('Error in getCoordinates:', error);
        return of(null);
      })
    );
  }

  private getWeatherByCoordinates(lat: number, lon: number): Observable<WeatherResponse> {
    const url = `/api/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    console.log('Weather URL:', url);
    return this.http.get<WeatherResponse>(url).pipe(
      tap(response => console.log('Raw weather response:', response)),
      catchError(error => {
        console.error('Error in getWeatherByCoordinates:', error);
        throw error;
      })
    );
  }
}