import { Injectable } from '@angular/core';
import demoQuizzes from '.././demo-quizzes.json'

import { GameInstance, QuizCollection } from './game-instance.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';
// import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _gameUrl = 'https://localhost:7073/api/NewGames/1';

 // private _demoQuizzes: QuizCollection = demoQuizzes as QuizCollection;
 private demoMode = true;

  constructor(private http: HttpClient) { }

 // public testQuestions!: GameInstance;

 /*  getGameInstance() : any {
    return testQuestions; 
  } */

    getGameInstance() : Observable<GameInstance> {
      if (this.demoMode) {
        const quizCollection: QuizCollection = {
          quizzes: demoQuizzes.quizzes.map(quiz => ({
            ...quiz,
            dateAttempted: new Date(quiz.dateAttempted)
          })) as unknown as GameInstance[]
        };
        return this.selectRandomQuiz(quizCollection);
      }


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

  selectRandomQuiz({ quizzes }: QuizCollection): Observable<GameInstance> {
  if (quizzes.length === 0) {
    throw new Error("Cannot select a quiz from an empty collection.");
  }

  const randomIndex = Math.floor(Math.random() * quizzes.length);
  return of(quizzes[randomIndex]);
}

}
