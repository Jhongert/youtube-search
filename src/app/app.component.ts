import { Component } from '@angular/core';
import { SearchResult } from './search-result.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  results: SearchResult[];
  loading: boolean;

  updateResults(results: SearchResult[]): void {
    this.results = results;
    console.log("results:", this.results); // uncomment to take a look
  }
}
