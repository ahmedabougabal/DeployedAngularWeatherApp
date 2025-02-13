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
      <h1 class="app-title">Weather Forecast App</h1>
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
      <div class="animated-footer">
        <div class="moving-text">
          <span class="text-content">
            <ng-container *ngFor="let char of footerText.split(''); let i = index">
              <span [ngClass]="{
                'palestine-p': char.toLowerCase() === 'p',
                'palestine-a': char.toLowerCase() === 'a',
                'palestine-l': char.toLowerCase() === 'l',
                'palestine-e': char.toLowerCase() === 'e',
                'palestine-s': char.toLowerCase() === 's',
                'palestine-t': char.toLowerCase() === 't',
                'palestine-i': char.toLowerCase() === 'i',
                'palestine-n': char.toLowerCase() === 'n'
              }" class="letter-spacing">{{char}}</span>
            </ng-container>
          </span>
          <span class="text-content">
            <ng-container *ngFor="let char of footerText.split(''); let i = index">
              <span [ngClass]="{
                'palestine-p': char.toLowerCase() === 'p',
                'palestine-a': char.toLowerCase() === 'a',
                'palestine-l': char.toLowerCase() === 'l',
                'palestine-e': char.toLowerCase() === 'e',
                'palestine-s': char.toLowerCase() === 's',
                'palestine-t': char.toLowerCase() === 't',
                'palestine-i': char.toLowerCase() === 'i',
                'palestine-n': char.toLowerCase() === 'n'
              }" class="letter-spacing">{{char}}</span>
            </ng-container>
          </span>
          <span class="text-content">
            <ng-container *ngFor="let char of footerText.split(''); let i = index">
              <span [ngClass]="{
                'palestine-p': char.toLowerCase() === 'p',
                'palestine-a': char.toLowerCase() === 'a',
                'palestine-l': char.toLowerCase() === 'l',
                'palestine-e': char.toLowerCase() === 'e',
                'palestine-s': char.toLowerCase() === 's',
                'palestine-t': char.toLowerCase() === 't',
                'palestine-i': char.toLowerCase() === 'i',
                'palestine-n': char.toLowerCase() === 'n'
              }" class="letter-spacing">{{char}}</span>
            </ng-container>
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      padding: 2rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .app-title {
      color: white;
      text-align: center;
      margin: 0 0 2rem;
      font-size: 2.5rem;
      font-weight: 300;
      letter-spacing: 1px;
      text-shadow: 2px 2px 4px rgba(128, 0, 32, 0.3);
    }

    .main-content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-bottom: 4rem;
    }

    .glass-container {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(12px);
      border-radius: 20px;
      padding: 2rem;
      width: 100%;
      max-width: 800px;
      box-shadow: 
        0 8px 32px rgba(128, 0, 32, 0.2),
        0 4px 16px rgba(216, 86, 125, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.4);
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 2rem;
    }

    .fade-in {
      animation: fadeIn 0.5s ease-in;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .animated-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 1rem;
      text-align: center;
      background: linear-gradient(to right, 
        rgba(128, 0, 32, 0.1),
        rgba(128, 0, 32, 0.1)
      );
      overflow: hidden;
      box-shadow: 0 -4px 16px rgba(128, 0, 32, 0.1);
    }

    .moving-text {
      display: inline-flex;
      white-space: nowrap;
      color: rgba(255, 255, 255, 0.95);
      font-size: 1rem;
      transform: translateX(0);
      animation: scroll 40s linear infinite;
      text-shadow: 1px 1px 2px rgba(128, 0, 32, 0.3);
    }

    .text-content {
      display: inline-flex;
      padding-right: 2rem;
    }

    .letter-spacing {
      margin: 0 1px;
      padding: 0 1px;
    }

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-33.33%);
      }
    }

    .palestine-p { 
      color: #2d5a27; 
      text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.4);
    }
    .palestine-a { 
      color: #ffffff; 
      text-shadow: 1px 1px 2px rgba(128, 0, 32, 0.3);
    }
    .palestine-l { 
      color: #2d5a27; 
      text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.4);
    }
    .palestine-e { 
      color: #ffffff; 
      text-shadow: 1px 1px 2px rgba(128, 0, 32, 0.3);
    }
    .palestine-s { 
      color: #2d5a27; 
      text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.4);
    }
    .palestine-t { 
      color: #ffffff; 
      text-shadow: 1px 1px 2px rgba(128, 0, 32, 0.3);
    }
    .palestine-i { 
      color: #e31b23; 
      text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.4);
    }
    .palestine-n { 
      color: #e31b23; 
      text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.4);
    }

    .search-section h2,
    .search-description {
      color: rgba(0, 0, 0, 0.8);
      text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3);
    }

    @media (max-width: 768px) {
      .app-container {
        padding: 1rem;
      }

      .glass-container {
        padding: 1.5rem;
      }

      .app-title {
        font-size: 2rem;
        margin-bottom: 1.5rem;
      }

      .moving-text {
        font-size: 0.95rem;
      }
    }

    @media (max-width: 565px) {
      .app-container {
        padding: 0.5rem;
      }

      .glass-container {
        padding: 1rem;
      }

      .app-title {
        font-size: 1.8rem;
        margin-bottom: 1rem;
      }

      .moving-text {
        font-size: 0.9rem;
      }
      .letter-spacing {
        margin: 0 0.5px;
        padding: 0 0.5px;
      }
    }
  `]
})
export class AppComponent {
  weather: WeatherResponse | null = null;
  loading = false;
  footerText = 'Made with ♥ by Gabal    -    Free Palestine Forever    -    From the River to the Sea Palestine Will Be Free    -    ';

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
