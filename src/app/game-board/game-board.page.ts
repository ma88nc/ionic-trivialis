import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameService } from './game.service';
import { GameInstance } from './game-instance.model';
import { DecodeHtmlString } from '../shared/decodeHtml.pipe';
import { environment } from 'src/environments/environment';  // was environment.prod
import { IonInput } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-game-board',
  templateUrl: './game-board.page.html',
  styleUrls: ['./game-board.page.scss'],
})
export class GameBoardPage implements OnInit {

  constructor(private gameSvc: GameService) { }
  //@ViewChild('input', { read: ElementRef, static: false }) inputEl!: ElementRef;
  @ViewChild('input', { read: ElementRef, static: false }) set inputRef(content: ElementRef) {
    if (content) {
      // The element is now officially rendered in the DOM
      this.focusInput(content);
    }
  }

  @ViewChild('input', { static: false }) input!: IonInput;

  private focusInput(inputElement?: ElementRef): void {
    setTimeout(() => {
      if (inputElement) {
        inputElement.nativeElement.querySelector('input')?.focus();
      } else {
        this.input?.setFocus();
      }
    }, 50);
  }

  public topics: string[] = []; // = ['Add a Letter', 'Alphabetically First', '19th Century Photographs', 'Anagrams', 'Alma Maters of', 'Number of ...'];

  public columns!: number

  public gameInst!: GameInstance;

  public baseImageUrl = environment.baseImageUrl;
  public isLoading = false;

  selectedTopicIndex: number = -1;

  ngOnInit() {
    // this.gameInst = this.gameSvc.getGameInstance();
  /*   this.isLoading = true;
    this.gameSvc.getGameInstance()
      .subscribe(game => {
        this.gameInst = game;

        this.gameInst.subjectSet.forEach(subSet => {
          this.topics.push(subSet.subject);
        })
        this.columns = this.topics.length / 2;

        this.setDimension();
        this.isLoading = false;
      }) */
     this.getNewGame();
  }

/*  ionViewDidEnter() {
    setTimeout(() => {
      if (this.inputEl && this.inputEl.nativeElement) {
        // Query the underlying HTML input hidden inside Ionic's Shadow DOM
        const nativeInput = this.inputEl.nativeElement.querySelector('input');
        if (nativeInput) {
          nativeInput.focus();
        }
      }
    }, 200);
  } */

  // These are for subject/topic array
  // https://stackoverflow.com/questions/59182459/how-to-create-dynamic-grid-component-in-angular-8-and-bootstrap-whit-row-col-an
  public colArray: number[] = [];
  public rowArray: number[] = [];

  // This is for the vertical column of questions
  public questionArray: number[] = [100, 200, 300, 400, 500];

  public rows = 2;
  setDimension() {
    this.colArray = [];
    this.rowArray = [];
    for (let i = 0; i < this.columns; i++) {
      this.colArray.push(i);
    }
    for (let i = 0; i < this.rows; i++) {
      this.rowArray.push(i);
    }
  }

  // This is a running count of questions answered. Each question object is updated with current value as it is answered, 
  // then this value below is incremented.
  public orderAnswered: number = 1;

  public userAnswer: string = "";
  public score: number = 0;
  public activeSubjectIndex: number = -1;
  public activeQuestionIndex: number = -1;

  public clickTopic(index: number) {
    console.log("Clicked on topic with index ", index);
    this.activeSubjectIndex = index;
    this.activeQuestionIndex = -1;
  }

  public clickQuestion(index: number) {
    console.log("Clicked on question with index ", index, "and activesubjectindex ", this.activeSubjectIndex);
    this.activeQuestionIndex = index;
    this.userAnswer = "";
    console.log("  question: ", this.gameInst.subjectSet[this.activeSubjectIndex].questions[index])
  }

  public getSubjectClass(index: number) {
    return (index === this.activeSubjectIndex) ? 'subject-highlighted-selection' : 'subject-unhighlighted';
  }

  public getQuestionClass(qIndex: number) {
    //    console.log('getQuestionClass() qIndex=', qIndex, "questions: ", typeof this.gameInst.subjectSet[this.activeSubjectIndex].questions === 'undefined' );
    /*    if (this.gameInst.subjectSet[this.activeSubjectIndex].questions[qIndex]?.orderAnswered > 0)
         return 'question-previously-picked'; */
    //  return (qIndex === this.activeQuestionIndex) ? 'question-highlighted' : 'question-unhighlighted';
    return (qIndex === this.activeQuestionIndex) ? 'tertiary' : 'primary';
  }

  onSubmit() {/*  */
    console.log("You clicked on submit answer which I see is ", this.userAnswer, "!!");
    console.log("That answer is ", this.isAnswerCorrect(this.userAnswer) ? 'correct' : 'incorrect');
    const isCorrect = this.isAnswerCorrect(this.userAnswer);
    this.gameInst.subjectSet[this.activeSubjectIndex].questions[this.activeQuestionIndex].isCorrect = isCorrect;
    this.gameInst.subjectSet[this.activeSubjectIndex].questions[this.activeQuestionIndex].userAnswer = this.userAnswer;
    this.gameInst.subjectSet[this.activeSubjectIndex].questions[this.activeQuestionIndex].orderAnswered = this.orderAnswered++;
    // console.log("active question: ", this.gameInst.subjectSet[this.activeSubjectIndex].questions[this.activeQuestionIndex]);

    // TODO - Use questionArray below.
    this.score += (this.activeQuestionIndex + 1) * 100 * (isCorrect ? 1 : -1);
    this.focusInput();
    // this.gameInst.subjectSet[this.activeSubjectIndex].questions[this.activeQuestionIndex] = ...{ .isCorrect: this.isAnswerCorrect(this.userAnswer)}
    console.log(this.gameInst);
  }

  isAnswerCorrect(userAnswer: string): boolean {
    const userAnsLowerCase = userAnswer.toLowerCase();
    for (let corrAns of this.gameInst.subjectSet[this.activeSubjectIndex].questions[this.activeQuestionIndex].correctAnswers) {
      let correctAnswerLowerCase = corrAns.answerText.toLowerCase();
      console.log("user answer:", userAnsLowerCase, "answer:", correctAnswerLowerCase, "is regex?", corrAns.isRegex);
      if (!corrAns.isRegex && (userAnsLowerCase === correctAnswerLowerCase))
        return true;
      else {
        // instantiate reg ex
        let regex = new RegExp(correctAnswerLowerCase)
        if (regex.test(userAnsLowerCase))
          return true;
      };
    }
    return false;
  }

  showSubmitButton(): boolean {
    //  console.log("in showSubmitButton(): ", this.gameInst.subjectSet[this.activeSubjectIndex].questions[this.activeQuestionIndex].orderAnswered);
    // return typeof this.gameInst.subjectSet[this.activeSubjectIndex].questions[this.activeQuestionIndex].orderAnswered === "undefined";
    return true;
  }

  getNewGame() {
    // reset everything
    this.topics = []; 
    this.userAnswer = "";
    this.score = 0;
    this.activeSubjectIndex = -1;
    this.activeQuestionIndex = -1;

    this.isLoading = true;

    this.gameSvc.getGameInstance()
      .subscribe(game => {
        this.gameInst = game;

        this.gameInst.subjectSet.forEach(subSet => {
          this.topics.push(subSet.subject);
        })
        this.columns = this.topics.length / 2;

        this.setDimension();
        this.isLoading = false;
        // For testing HTML decoding
        // this.gameInst.subjectSet[0].questions[0].questionText += " log\u2081\u2080 1000";
        // this.gameInst.subjectSet[0].questions[1].questionText;
        //this.gameInst.subjectSet[0].questions[0].imagePath = "Entertainment/Puffy_Shirt_2006.jpg";
        //this.gameInst.subjectSet[0].questions[0].imagePath = "Science/Eqn_Quadratic2.gif";
        //this.gameInst.subjectSet[0].questions[0].hasImage = true;
      })
  }
  
     ionViewWillEnter() {
       this.userAnswer = "";
       console.log("In ionViewWillEnter()!");
     }

     isPositiveInteger = (num: number): boolean => {
        // Check if the value is an integer and greater than 0
        return Number.isInteger(num) && num > 0;
};

public allGreaterZero = (numbers1: any[]): boolean => {
  console.log("In allGreaterZero() with ", numbers1);
  return numbers1.every(this.isPositiveInteger);
}

  isDisabled(index: number): boolean {
      // example: disable if topic is empty or already answered
      return !this.topics[index] || 
      this.allGreaterZero(this.gameInst.subjectSet[index].questions.map(q => q.orderAnswered));
      //this.gameInst.subjectSet[this.activeSubjectIndex].questions[index]?.orderAnswered > 0;
    }
}
