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

export interface OptionData {
  title: string;
}

export interface QuestionData {
  question_info: {
    title: string;
    question_type: "SingleChoice" | "MultipleChoice" | "OpenAnswer";
  };
  option_data?: OptionData[];
}

export interface PollData {
  poll_data: {
    title: string;
    author_id: number;
    description: string;
    number_of_vote: number;
    creation_date: string;
    end_date?: string | null;
    is_anonymous: boolean;
    is_private: boolean;
  };

  question_data: QuestionData[];
}
