import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private initialPageState = {
    pageIndex: 1,
    pageSize: 40
  };

  private _paginationInfo: BehaviorSubject<any> = new BehaviorSubject(this.initialPageState);

  constructor() {
    this.initializePaginationState();
  }

  getPaginationState() {
    return this._paginationInfo;
  }

  setPaginationState(search: any) {
    this._paginationInfo.next(search);
  }

  initializePaginationState() {
    this._paginationInfo = new BehaviorSubject(this.initialPageState);
  }
}
