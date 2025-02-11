import { Component, Input } from '@angular/core';
import { CommonModule, WeekDay } from '@angular/common';
import {MatCardModule} from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';
import { WeatherResponse } from '../../interfaces/weather.interface';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
  <div class="weather-container" *ngIf="weather">
    <mat-card>
      <mat-card-header>
        <mat-card-title>Current Weather</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="weather-info">
          <img [src]="getWeatherIcon(weather.current.weather[0].icon)" [alt]="weather.current.weather[0].description">
          <div class="temperature">{{ weather.current.temp }}°C</div>
          <div class="description">{{ weather.current.weather[0].description }}</div>
          <div class="details">
            <div>Feels like: {{ weather.current.feels_like }}°C</div>
            <div>Humidity: {{ weather.current.humidity }}%</div>
            <div>Wind: {{ weather.current.wind_speed }} m/s</div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>

    <div class="forecast-container">
      <mat-card *ngFor="let day of weather.daily.slice(1, 6)">
        <mat-card-content>
          <div class="forecast-day">
            <div>{{ getDate(day.dt) }}</div>
            <img [src]="getWeatherIcon(day.weather[0].icon)" [alt]="day.weather[0].description">
            <div class="temp-range">
              <span>{{ day.temp.max }}°C</span>
              <span class="min-temp">{{ day.temp.min }}°C</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  </div>
`,
styles: [`
  .weather-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  .weather-info {
    text-align: center;
    padding: 20px;
  }
  .temperature {
    font-size: 48px;
    font-weight: bold;
    margin: 10px 0;
  }
  .description {
    font-size: 24px;
    margin-bottom: 20px;
    text-transform: capitalize;
  }
  .details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
  }
  .forecast-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-top: 20px;
  }
  .forecast-day {
    text-align: center;
  }
  .temp-range {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }
  .min-temp {
    color: #666;
  }
  img {
    width: 50px;
    height: 50px;
  }
`]
})


export class WeatherDisplayComponent {
  @Input() weather : WeatherResponse | null = null;

  getWeatherIcon(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  getDate(timestamp: number): string{
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday:'short'
    }
    );
  }
}
