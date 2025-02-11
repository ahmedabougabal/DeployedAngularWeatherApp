import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { WeatherDisplayComponent } from './components/weather-display/weather-display.component';
import { WeatherService } from './services/weather.service';
import { WeatherResponse } from './interfaces/weather.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SearchComponent,
    WeatherDisplayComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="app-container">
      <h1 class="app-title">Weather App</h1>
      <div class="main-content">
        <div class="glass-container">
          <div class="search-section">
            <app-search (searched)="onSearch($event)"></app-search>
          </div>
          <div class="weather-section">
            <div *ngIf="loading" class="loading-container">
              <mat-spinner [diameter]="40"></mat-spinner>
            </div>
            <app-weather-display 
              *ngIf="!loading && weather" 
              [weather]="weather"
              class="fade-in">
            </app-weather-display>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #00feba, #5b548a);
      padding: 2rem;
      box-sizing: border-box;
    }

    .app-title {
      text-align: center;
      margin: 0 0 2rem;
      font-size: 2.5rem;
      font-weight: 300;
      color: white;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    .main-content {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: calc(100vh - 120px);
    }

    .glass-container {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      width: 100%;
      max-width: 1200px;
      min-height: 600px;
      display: flex;
      overflow: hidden;
    }

    .search-section {
      width: 300px;
      border-right: 1px solid rgba(255, 255, 255, 0.2);
      padding: 2rem;
    }

    .weather-section {
      flex: 1;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }

    .loading-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    :host ::ng-deep {
      .mat-mdc-progress-spinner {
        --mdc-circular-progress-active-indicator-color: white;
      }
    }

    @media (max-width: 768px) {
      .app-container {
        padding: 1rem;
      }

      .glass-container {
        flex-direction: column;
        min-height: auto;
      }

      .search-section {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding: 1rem;
      }

      .weather-section {
        padding: 1rem;
      }

      .app-title {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
    }
  `]
})
export class AppComponent {
  weather: WeatherResponse | null = null;
  loading = false;

  constructor(
    private weatherService: WeatherService,
    private snackBar: MatSnackBar
  ) {}

  onSearch(city: string) {
    this.loading = true;
    this.weather = null;

    this.weatherService.getWeatherByCity(city).subscribe({
      next: (response) => {
        this.weather = response;
        if (!response) {
          this.showError('City not found. Please try again.');
        }
      },
      error: () => {
        this.showError('An error occurred. Please try again.');
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }
}
