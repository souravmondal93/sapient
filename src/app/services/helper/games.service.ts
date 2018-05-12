import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private initialGamesState = [];

  private _gamesList: BehaviorSubject<any> = new BehaviorSubject(this.initialGamesState);

  constructor() {
    this.initializeGamesList();
  }

  getGamesState() {
    return this._gamesList;
  }

  setGamesState(search: any) {
    this._gamesList.next(search);
  }

  initializeGamesList() {
    this._gamesList = new BehaviorSubject(this.initialGamesState);
  }
}
