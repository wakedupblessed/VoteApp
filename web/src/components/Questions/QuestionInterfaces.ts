import { ReactNode } from "react";

import { IQuestion } from "../../api/Polls/interfaces";

export interface BaseQuestionProps {
  title: string;
  index: number;
  children: ReactNode;
}

export interface CustomQuestionProps {
  key: string;
  data: IQuestion;
  index: number;
  onStateChange: (id: string, value: any) => void;
}

export interface IQuestionsContainer {
  questions: IQuestion[];
}
