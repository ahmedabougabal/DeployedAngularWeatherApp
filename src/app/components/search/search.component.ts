import { Component, EventEmitter, Output } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
  <div class="search-container">
    <mat-form-field appearance="fill">
      <mat-label>Enter city name</mat-label>
      <input matInput [formControl]="searchControl" placeholder="e.g., London">
      <button mat-icon-button matSuffix (click)="onSearch()">
        <mat-icon>search</mat-icon>
      </button>
    </mat-form-field>
  </div>
`,
styles: [`
  .search-container {
    display: flex;
    justify-content: center;
    padding: 20px;
  }
  mat-form-field {
    width: 300px;
  }
`]
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();
  searchControl = new FormControl('');

  onSearch(): void {
    const value = this.searchControl.value?.trim();
    if(value){
      this.search.emit(value);
    }
  }
}
