import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import { map, startWith } from 'rxjs/operators';

import { SearchService } from '../services/helper/search.service';
import { GamesService } from '../services/helper/games.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  private searchString = '';
  private gamesList = [];
  sortDirection = '';
  searchFormControl = new FormControl();
  formControlSubscriber: Subscription;
  filteredGames: Observable<any[]>;

  constructor(
    private searchService: SearchService,
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    this.filteredGames = this.searchFormControl.valueChanges
      .pipe(
        startWith(''),
        map(query => query ? this.filterGames(query) : this.gamesList.slice())
      );

    this.formControlSubscriber = this.searchFormControl.valueChanges
      .debounceTime(500)
      .subscribe(newValue => {
        this.searchString = newValue;
        this.searchService.setSearchState({query: this.searchString, sort: this.sortDirection});
      });

    this.gamesService.getGamesState()
      .subscribe((games) => {
        console.log('Games List', games);
        this.gamesList = games;
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

  filterGames(query: string) {
    return this.gamesList.filter(game => {
      if (game && game.title) {
        game.title.toLowerCase().includes(query.toLowerCase());
      }
    });
  }
}
