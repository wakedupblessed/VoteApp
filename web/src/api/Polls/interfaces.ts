export interface IPoll {
  id: string;
  title: string;
  author: string;
  description: string;
  numberOfVote: number;
  creationDate: Date;
  endDate: Date;
  isAnonymous: boolean;
  responders: null;
  question: IQuestion[];
}

export interface IPrivatePoll extends IPoll {
  poll: IPoll;
  pollees: null;
}

export interface IQuestion {
  id: string;
  type: QuestionType;
  title: string;
  options: IOption[];
}

export interface IOption {
  id: string;
  title: string;
}
export interface IAnswer {
  userId: string;
  questionId: string;
  selectedOptions: IOption[] | null;
  openAnswer: string;
}

export interface ApiResponse {
  items: IPoll[];
}

export enum QuestionType {
  SingleChoice,
  MultipleChoice,
  OpenAnswer,
}

