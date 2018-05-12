import { Component, OnInit } from '@angular/core';

import { GamesService } from '../../services/api/games.service';
import { SearchService } from '../../services/helper/search.service';

import * as _ from 'lodash'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public games: any;
  private allGamesList: any;
  private searchedGamesList: any;
  private allAscSortedGamesList: any;
  private allDescSortedGamesList: any;
  private oldQueryString: string;
  private oldSortDirection: string;

  constructor(
    private gamesService: GamesService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.gamesService.getGames()
      .subscribe(games => {
        this.allGamesList = [].concat(games);
        this.games = [].concat(games);
        this.games.forEach((game) => {
          game.genreList = game.genre.split(',').filter(Boolean);
        });
      });

    this.searchService.getSearchState()
      .subscribe( search => {
        if (this.oldQueryString !== search.query) {
          if (this.allGamesList && this.allGamesList.length && search.query !== '') {
            this.searchedGamesList = this.allGamesList.concat().filter((game) => {
              if (game.title.length) {
                return game.title.toLowerCase().includes(search.query.toLowerCase());
              }
            });
            this.games = [].concat(this.searchedGamesList);
          }

          if (this.allGamesList && this.allGamesList.length && search.query === '') {
            this.games = [].concat(this.allGamesList);
            this.searchedGamesList = [].concat(this.allGamesList);
          }
        }

        if (search.sort !== undefined && this.oldSortDirection !== search.sort) {
          const gamesListCopy = [].concat(this.searchedGamesList);
          if (this.allGamesList && this.allGamesList.length) {
            switch (search.sort) {
              case 'ASC':
                this.games = _.sortBy(gamesListCopy, ['score']);
                break;
              case 'DESC':
                this.games = _.sortBy(gamesListCopy, ['score']).reverse();
                break;
              case '':
                this.games = [].concat(this.searchedGamesList);
                break;
            }
          }
        }

        this.oldQueryString = search.query;
        this.oldSortDirection = search.sort;
      });
  }

}
