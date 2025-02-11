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
      <div class="weather-header">
        <h2>{{ weather.name }}</h2>
        <p class="date">{{ getCurrentDate() }}</p>
      </div>

      <div class="weather-content">
        <div class="main-weather">
          <div class="temperature-display">
            <span class="temp-value">{{ weather.main.temp | number:'1.0-0' }}°</span>
            <span class="temp-unit">C</span>
          </div>
          <div class="weather-icon">
            <img [src]="getWeatherIcon(weather.weather[0].icon)" [alt]="weather.weather[0].description">
            <p class="weather-description">{{ weather.weather[0].description }}</p>
          </div>
        </div>

        <div class="weather-details">
          <div class="detail-card">
            <mat-icon>thermostat</mat-icon>
            <div class="detail-info">
              <span class="label">Feels Like</span>
              <span class="value">{{ weather.main.feels_like | number:'1.0-0' }}°C</span>
            </div>
          </div>

          <div class="detail-card">
            <mat-icon>water_drop</mat-icon>
            <div class="detail-info">
              <span class="label">Humidity</span>
              <span class="value">{{ weather.main.humidity }}%</span>
            </div>
          </div>

          <div class="detail-card">
            <mat-icon>air</mat-icon>
            <div class="detail-info">
              <span class="label">Wind Speed</span>
              <span class="value">{{ weather.wind.speed }} m/s</span>
            </div>
          </div>

          <div class="detail-card">
            <mat-icon>arrow_downward</mat-icon>
            <div class="detail-info">
              <span class="label">Min Temp</span>
              <span class="value">{{ weather.main.temp_min | number:'1.0-0' }}°C</span>
            </div>
          </div>

          <div class="detail-card">
            <mat-icon>arrow_upward</mat-icon>
            <div class="detail-info">
              <span class="label">Max Temp</span>
              <span class="value">{{ weather.main.temp_max | number:'1.0-0' }}°C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .weather-container {
      width: 100%;
      height: 100%;
      color: white;
      padding: 1rem;
    }

    .weather-header {
      text-align: center;
      margin-bottom: 2rem;

      h2 {
        margin: 0;
        font-size: 2rem;
        font-weight: 400;
      }

      .date {
        margin: 0.5rem 0 0;
        color: rgba(255, 255, 255, 0.8);
        font-size: 1rem;
      }
    }

    .weather-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .main-weather {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3rem;
    }

    .temperature-display {
      display: flex;
      align-items: flex-start;
    }

    .temp-value {
      font-size: 6rem;
      font-weight: 300;
      line-height: 1;
    }

    .temp-unit {
      font-size: 2rem;
      margin-top: 0.5rem;
    }

    .weather-icon {
      text-align: center;

      img {
        width: 120px;
        height: 120px;
        filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
      }

      .weather-description {
        margin: 0.5rem 0 0;
        font-size: 1.2rem;
        text-transform: capitalize;
      }
    }

    .weather-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }

    .detail-card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.15);
      }

      mat-icon {
        font-size: 1.5rem;
        height: 1.5rem;
        width: 1.5rem;
      }
    }

    .detail-info {
      display: flex;
      flex-direction: column;

      .label {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.8);
      }

      .value {
        font-size: 1.1rem;
        font-weight: 500;
      }
    }

    @media (max-width: 768px) {
      .main-weather {
        flex-direction: column;
        gap: 1rem;
      }

      .temp-value {
        font-size: 4rem;
      }

      .temp-unit {
        font-size: 1.5rem;
      }

      .weather-details {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .weather-details {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class WeatherDisplayComponent {
  @Input() weather: WeatherResponse | null = null;

  getWeatherIcon(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}