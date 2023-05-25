import { ReactNode } from "react";

import { QuestionDTO } from "../../api/Polls/interfaces/polls";

export interface BaseQuestionProps {
  title: string;
  index: number;
  children: ReactNode;
}

export interface CustomQuestionProps {
  key: string;
  data: QuestionDTO;
  index: number;
  onStateChange: (id: string, value: any) => void;
}

export interface IQuestionsContainer {
  questions: QuestionDTO[];
}
