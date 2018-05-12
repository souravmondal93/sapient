import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private initialSearchState = [
    {
      query: '',
      sort: ''
    }
  ];

  private _searchDetails: BehaviorSubject<any> = new BehaviorSubject(this.initialSearchState);

  constructor() {
    this.initializeSearch();
  }

  getSearchState() {
    return this._searchDetails;
  }

  setSearchState(search: any) {
    this._searchDetails.next(search);
  }

  initializeSearch() {
    this._searchDetails = new BehaviorSubject(this.initialSearchState);
  }
}
