import { QuestionStatisticDTO } from "../../api/Polls/interfaces/polls";

export interface StatisticGeneralComponentProps {
  data: QuestionStatisticDTO[];
  isAnonymous: boolean;
}

export interface StatisticComponentProps {
  data: QuestionStatisticDTO;
  isAnonymous: boolean;
}
