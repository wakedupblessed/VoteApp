export interface PollPreviewDTO {
  id: string;
  title: string;
  author: UserDTO;
  endDate: string;
}

export interface UserDTO {
  id: number;
  username: string;
}

export enum QuestionType {
  SingleChoice,
  MultipleChoice,
  OpenAnswer,
}

export interface OptionDTO {
  id: string;
  title: string;
  question: string;
}

export interface OptionStatisticDTO {
  id: string;
  title: string;
  question: string;
  votes_percent: number;
}

export interface QuestionDTO {
  question_info: {
    id: string;
    title: string;
    question_type: "SingleChoice" | "MultipleChoice" | "OpenAnswer";
    poll: string;
  };
  option_data?: OptionDTO[];
}

export interface QuestionStatisticDTO {
  question_info: {
    id: string;
    title: string;
    question_type: "SingleChoice" | "MultipleChoice" | "OpenAnswer";
    poll: string;
  };
  answer?: string | null;
  option_data?: OptionStatisticDTO[] | null;
}

export interface PollDTO {
  poll_data: {
    id: string;
    title: string;
    description: string;
    author: UserDTO;
    number_of_vote: number;
    creation_date: string;
    end_date: string;
    is_anonymous: boolean;
    is_private: boolean;
    responders?: UserDTO[] | null;
  };
  question_data: QuestionDTO[];
}

export interface QuestionAnswer {
  user_id: number;
  question_id: string;
  single_option_id: string | null;
  multiple_options: string[];
  open_answer: string | null;
}

export interface PollVote {
  answers: QuestionAnswer[];
}

export interface UsersDTO {
  users: UserDTO[];
}

export interface PollStatisticDTO {
  poll_data: {
    id: string;
    title: string;
    description: string;
    author: UserDTO;
    number_of_vote: number;
    creation_date: string;
    end_date: string;
    is_anonymous: boolean;
    is_private: boolean;
    responders?: UserDTO[] | null;
  };
  question_data: QuestionStatisticDTO[];
}
