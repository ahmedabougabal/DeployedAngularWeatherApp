import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
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
          <mat-card-title>{{ weather.name }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="weather-info">
            <img [src]="getWeatherIcon(weather.weather[0].icon)" [alt]="weather.weather[0].description">
            <div class="temperature">{{ weather.main.temp }}°C</div>
            <div class="description">{{ weather.weather[0].description }}</div>
            <div class="details">
              <div>Feels like: {{ weather.main.feels_like }}°C</div>
              <div>Humidity: {{ weather.main.humidity }}%</div>
              <div>Wind: {{ weather.wind.speed }} m/s</div>
            </div>
            <div class="temp-range">
              <span>Min: {{ weather.main.temp_min }}°C</span>
              <span>Max: {{ weather.main.temp_max }}°C</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .weather-container {
      padding: 20px;
      max-width: 600px;
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
    .temp-range {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }
    img {
      width: 100px;
      height: 100px;
    }
  `]
})
export class WeatherDisplayComponent {
  @Input() weather: WeatherResponse | null = null;

  getWeatherIcon(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}