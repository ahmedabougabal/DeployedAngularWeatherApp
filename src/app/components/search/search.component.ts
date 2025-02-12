import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="search-container">
      <h2>Search Location</h2>
      <p class="search-description">Enter a city name to get the current weather information</p>
      
      <div class="search-box">
        <mat-form-field appearance="outline">
          <input matInput
                 [(ngModel)]="city"
                 placeholder="Enter city name"
                 (keyup.enter)="onSearch()"
                 class="search-input">
          <button mat-icon-button matSuffix (click)="onSearch()">
            <mat-icon>search</mat-icon>
          </button>
        </mat-form-field>
      </div>

      <div class="search-tips">
        <h3>Popular Cities</h3>
        <div class="popular-cities">
          <button mat-button 
                  *ngFor="let city of popularCities" 
                  (click)="searchCity(city)"
                  class="city-chip">
            {{ city }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      color: white;
      height: 100%;
    }

    h2 {
      margin: 0 0 1rem;
      font-size: 1.5rem;
      font-weight: 400;
    }

    .search-description {
      margin: 0 0 2rem;
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .search-box {
      margin-bottom: 2rem;
    }

    :host ::ng-deep {
      .mat-mdc-form-field {
        width: 100%;
      }

      .mat-mdc-text-field-wrapper {
        background: rgba(255, 255, 255, 0.1) !important;
      }

      .mat-mdc-form-field-outline {
        color: rgba(255, 255, 255, 0.3) !important;
      }

      .mdc-text-field--outlined {
        --mdc-theme-primary: white;
        --mdc-theme-text-primary-on-background: white;
      }

      .mat-mdc-input-element {
        color: white !important;
      }

      .mat-mdc-form-field-label {
        color: rgba(255, 255, 255, 0.7) !important;
      }
    }

    .search-tips {
      h3 {
        font-size: 1rem;
        font-weight: 400;
        margin: 0 0 1rem;
        color: rgba(255, 255, 255, 0.9);
      }
    }

    .popular-cities {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .city-chip {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border-radius: 20px;
      padding: 0.3rem 1rem;
      font-size: 0.9rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
      }
    }

    @media (max-width: 768px) {
      .search-container {
        text-align: center;
      }

      .popular-cities {
        justify-content: center;
      }
    }
  `]
})
export class SearchComponent {
  @Output() searched = new EventEmitter<string>();
  city: string = '';
  popularCities = ['London', 'New York', 'Tokyo', 'Paris', 'Dubai'];

  onSearch() {
    if (this.city.trim()) {
      this.searched.emit(this.city);
    }
  }

  searchCity(city: string) {
    this.city = city;
    this.onSearch();
  }
}
