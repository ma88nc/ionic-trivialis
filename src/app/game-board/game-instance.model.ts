import { Question, UserAnswer } from "./question.model";

export class GameInstance {
    constructor(
    public dateAttempted: Date,
    public subjectSet: SubjectSet[]
    ) {}
}

export class SubjectSet {
    constructor(
        public subject: string,
        public questions: UserAnswer[] //Question[]
    ) {}
}

export interface QuizCollection {
  quizzes: GameInstance[];
}