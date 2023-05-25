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

export interface QuestionDTO {
  question_info: {
    id: string;
    title: string;
    question_type: "SingleChoice" | "MultipleChoice" | "OpenAnswer";
    poll: string;
  };
  option_data?: OptionDTO[];
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
