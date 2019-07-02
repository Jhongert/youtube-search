import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { SearchResult } from '../search-result.model';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
})
export class SearchResultComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'col-sm-6 col-md-4 col-lg-3';
  @Input() result: SearchResult;
  constructor() { }

  ngOnInit() {
  }

}
