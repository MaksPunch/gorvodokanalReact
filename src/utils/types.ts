export interface IAnswer {
  id: number;
  questionId: number;
  rightAnswer: boolean;
  answer: string;
  selected: boolean;
}

export interface IQuestion {
  id: number;
  testId: number;
  type: string;
  answers: null | IAnswer[];
  name: string;
  done: boolean;
}

export interface ITest {
  id: number;
  name: string;
  questions: IQuestion[];
}

export interface ISection {
  id: number;
  name: string;
  testId: number;
  content: string;
  steps: number;
}

export interface ICourse {
  id: number;
  name: string;
  sections: ISection[];
}
