import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { apiUrl } from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private baseUrl: string = apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getGames() {
    return this.http.get(this.baseUrl);
  }
}
