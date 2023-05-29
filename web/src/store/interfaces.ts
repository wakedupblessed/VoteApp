export interface OptionCreate {
  title: string;
}

export interface OptionUpsert {
  questionIndex: number;
  optionIndex: number;
  title: string;
}

export interface OptionDelete {
  questionIndex: number;
  optionIndex: number;
}

export interface QuestionDTO {
  question_info: {
    index: number;
    title: string;
    question_type: "SingleChoice" | "MultipleChoice" | "OpenAnswer" | null;
  };
  option_data?: OptionUpsert[] | undefined;
}

export interface QuestionCreate {
  question_info: {
    title: string;
    question_type: "SingleChoice" | "MultipleChoice" | "OpenAnswer" | null;
  };
  option_data?: OptionCreate[];
}

export interface PollDTO {
  poll_data: {
    title: string;
    author_id: number;
    description: string;
    number_of_vote: number;
    creation_date: string;
    end_date?: string | null;
    is_anonymous: boolean;
    is_private: boolean;
    responders?: number[] | null;
  };
  question_data: QuestionCreate[];
}

export interface UsersDTO {
  users: UserDTO[];
}
