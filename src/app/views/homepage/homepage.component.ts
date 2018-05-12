import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { GamesService } from '../../services/api/games.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public games: any;

  constructor(
    private gamesService: GamesService
  ) {}

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.gamesService.getGames()
      .subscribe(games => {
        this.games = games;
        this.games.forEach((game) => {
          game.genreList = game.genre.split(',').filter(Boolean);
        });
        console.log(this.games);
      });
  }

}
