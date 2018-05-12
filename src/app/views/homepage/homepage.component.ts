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
        console.log(this.games);
      });

    this.searchService.getSearchState()
      .subscribe( search => {
        console.log('Search', search);
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
        console.log('Searched Games', this.games);
      });
  }

}
