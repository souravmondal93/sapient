import { Component, OnInit } from '@angular/core';

import { GamesDataService } from '../../services/api/games.service';
import { SearchService } from '../../services/helper/search.service';
import { GamesService } from '../../services/helper/games.service';
import { PaginationService } from '../../services/helper/pagination.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public games: any;
  private allGamesList: any;
  private searchedGamesList: any;
  private oldQueryString: string;
  private oldSortDirection: string;
  startIndex = 1;
  endIndex = 40;

  constructor(
    private gamesDataService: GamesDataService,
    private gamesService: GamesService,
    private searchService: SearchService,
    private paginationService: PaginationService
  ) {}

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.gamesDataService.getGames()
      .subscribe(games => {
        this.allGamesList = [].concat(games);
        this.games = [].concat(games);
        this.gamesService.setGamesState(games);
        this.gamesService.setDisplayedGamesState(games);
        this.games.forEach((game) => {
          game.genreList = game.genre.split(',').filter(Boolean);
        });
      });

    this.paginationService.getPaginationState()
      .subscribe((paginationInfo) => {
        if (!_.isEmpty(paginationInfo)) {
          const pageIndex = paginationInfo.pageIndex;
          const  pageSize = paginationInfo.pageSize;

          this.startIndex =  pageIndex * pageSize;
          this.endIndex =  ((pageIndex + 1) * pageSize);
        }
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

        this.gamesService.setDisplayedGamesState(this.searchedGamesList);
        this.oldQueryString = search.query;
        this.oldSortDirection = search.sort;
      });
  }

}
