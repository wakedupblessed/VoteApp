export interface Poll {
  title: string;
  description: string;
  is_anonymous: boolean;
  tags: null;
  question: Question[];
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  options: Option[];
}

export interface Option {
  id: string;
  name: string;
  is_correct: boolean | null;
  number_of_vote: number;
}

export interface PollResponse extends Poll {
  id: string;
  number_of_vote: number;
  creation_date: Date;
  voters: null;
}

export interface ApiResponse {
  items: PollResponse[];
}

export enum QuestionType {
  SingleChoice,
  MultipleChoice,
  OpenAnswer
}
