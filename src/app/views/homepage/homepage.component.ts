import { Component, OnInit } from '@angular/core';

import { GamesService } from '../../services/api/games.service';
import { SearchService } from '../../services/helper/search.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public games: any;
  private allGamesList: any;
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
        this.games = games;
        this.games.forEach((game) => {
          game.genreList = game.genre.split(',').filter(Boolean);
        });

        const arrayAscCopy = [].concat(this.allGamesList);
        const arrayDescCopy = [].concat(this.allGamesList);

        this.allAscSortedGamesList = arrayAscCopy.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));
        this.allDescSortedGamesList = arrayDescCopy.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
      });

    this.searchService.getSearchState()
      .subscribe( search => {
        if (this.oldQueryString !== search.query) {
          if (this.allGamesList && this.allGamesList.length && search.query !== '') {
            this.games = this.allGamesList.filter((game) => {
              if (game.title.length) {
                return game.title.toLowerCase().includes(search.query.toLowerCase());
              }
            });
          }

          if (this.allGamesList && this.allGamesList.length && search.query === '') {
            this.games = [].concat(this.allGamesList);
          }
        }

        if (this.oldSortDirection !== search.sort) {
          if (this.allGamesList && this.allGamesList.length) {
            switch (search.sort) {
              case 'ASC':
                this.games = [].concat(this.allAscSortedGamesList);
                break;
              case 'DESC':
                this.games = [].concat(this.allDescSortedGamesList);
                break;
              case '':
                this.games = [].concat(this.allGamesList);
                break;
            }
          }
        }

        this.oldQueryString = search.query;
        this.oldSortDirection = search.sort;
      });
  }

}
