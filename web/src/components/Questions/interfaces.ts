import { ReactNode } from "react";

import { QuestionDTO } from "../../api/Polls/interfaces/polls";

export interface BaseQuestionProps {
  title: string;
  children: ReactNode;
}

export interface QuestionAnswer {
  user_id: number;
  question_id: string;
  single_option_id: string | null;
  multiple_options: string[];
  open_answer: string | null;
}

export interface CustomQuestionProps {
  key: string;
  data: QuestionDTO;
  onStateChange: (question: QuestionAnswer) => void;
}

export interface IQuestionsContainer {
  questions: QuestionDTO[];
}
