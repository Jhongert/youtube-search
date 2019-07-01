import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { YoutubeSearchService } from '../youtube-search.service';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap, switchAll } from 'rxjs/operators';
import { SearchResult } from '../search-result.model';

@Component({
  selector: 'search-box',
  template: `
      <input type="text" class="form-control" placeholder="Search" autofocus>
    `
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();
  
  constructor(
      private youtube: YoutubeSearchService,
      private el: ElementRef
    ) { }

  ngOnInit() {
    fromEvent(this.el.nativeElement, 'keyup')
      .pipe(
        map((e:any) => e.target.value),
        filter((text: string) => text.length > 1),
        debounceTime(250),
        tap(() => this.loading.emit(true)),
        map((query: string) => this.youtube.search(query)),
        switchAll()
      ).subscribe( (results: SearchResult[]) => {
        this.loading.emit(false);
        this.results.emit(results);
      })
  }

}
