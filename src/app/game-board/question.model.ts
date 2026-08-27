export class Question {
    constructor(
        public questionId: string,
        public questionText: string,
        public correctAnswers: CorrectAnswer[],
        public displayAnswer: string,
        public difficultyLevel: number,
        public hasImage: boolean,
        public imagePath: string
    ) {}
}

export class CorrectAnswer {
    constructor(
        public answerText: string,
        public isRegex: boolean
    ) {}
}

export class UserAnswer extends Question {
    userAnswer!: string;
    isCorrect!: boolean;
    orderInGame!: number;
    orderAnswered: number = 0;
 //   dateTimeAnswered!: Date;
}