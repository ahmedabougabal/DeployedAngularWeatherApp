import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { WeatherDisplayComponent } from './components/weather-display/weather-display.component';
import { WeatherService } from './services/weather.service';
import { WeatherResponse } from './interfaces/weather.interface';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    SearchComponent,
    WeatherDisplayComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="app-container">
      <h1>Weather App</h1>
      <app-search (search)="onSearch($event)"></app-search>
      
      <div class="loading-container" *ngIf="loading">
        <mat-spinner></mat-spinner>
      </div>

      <app-weather-display [weather]="weatherData"></app-weather-display>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }
    .loading-container {
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }
  `]
})
export class AppComponent {
  weatherData: WeatherResponse | null = null;
  loading = false;
  
  constructor(
    private weatherService : WeatherService,
    private snackBar : MatSnackBar
  ) {}

  onSearch(city: string) : void {
    this.loading = true;
    this.weatherService.getWeatherByCity(city).subscribe({
      next: (data) => {
        this.weatherData = data;
        if(!data) {
          this.showError('City not found');
        }
      },
      error: () => {
        this.showError('Error fetching weather data');
      }, 
      complete: () => {
        this.loading = false;
      }
    })
  }
  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition:'center',
      verticalPosition: 'bottom',
    })
  }
}

