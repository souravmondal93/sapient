import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Subscription } from 'rxjs/index';
import 'rxjs/add/operator/debounceTime';

import { SearchService } from '../services/helper/search.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  private searchString = '';
  sortDirection = '';
  searchFormControl = new FormControl();
  formControlSubscriber: Subscription;

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {

    this.formControlSubscriber = this.searchFormControl.valueChanges
      .debounceTime(500)
      .subscribe(newValue => {
        this.searchString = newValue;
        this.searchService.setSearchState({query: this.searchString, sort: this.sortDirection});
      });
  }

  changeSortDirection () {
    switch (this.sortDirection) {
      case '':
        this.sortDirection = 'ASC';
        break;
      case 'ASC':
        this.sortDirection = 'DESC';
        break;
      case 'DESC':
        this.sortDirection = '';
        break;
    }
    this.searchService.setSearchState({query: this.searchString, sort: this.sortDirection});
  }
}
