import { Injectable } from '@angular/core';
import testQuestions from './test3-6-topics.json'

import { GameInstance } from './game-instance.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
// import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _gameUrl = 'https://localhost:7073/api/NewGames/1';

  constructor(private http: HttpClient) { }

 // public testQuestions!: GameInstance;

 /*  getGameInstance() : any {
    return testQuestions; 
  } */

    getGameInstance() : Observable<GameInstance> {
      return this.http.get<GameInstance>(this._gameUrl)
        .pipe(tap(data => console.log('New game: '+JSON.stringify(data)))) //,
     // error => console.log("ERROR")))
       // .catchError(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
      console.log('Error from http call: ' + err.message);
     //  return Observable.throw new Error(err);
       (err.message);
    }
}
