import { ReactNode } from "react";

import { QuestionDTO, QuestionAnswer } from "../../api/Polls/interfaces/polls";

export interface BaseQuestionProps {
  title: string;
  children: ReactNode;
}

export interface CustomQuestionProps {
  key: string;
  data: QuestionDTO;
  onStateChange: (question: QuestionAnswer) => void;
}

export interface IQuestionsContainer {
  questions: QuestionDTO[];
}
