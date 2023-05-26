import React from "react";
import { QuestionStatisticDTO } from "../../api/Polls/interfaces/polls";
import {
  StatisticComponentProps,
  StatisticGeneralComponentProps,
} from "./interfaces";
import ChoiceStatistic from "./ChoiceStatistic";
import OpenAnswerStatistic from "./OpenAnswerStatistic";
import styled from "styled-components";

const StatisticQuestionsContainer = (
  stastic: StatisticGeneralComponentProps
) => {
  const renderQuestion = (question: QuestionStatisticDTO) => {
    let StatisticComponent: React.ComponentType<StatisticComponentProps>;

    switch (question.question_info.question_type) {
      case "SingleChoice":
      case "MultipleChoice":
        StatisticComponent = ChoiceStatistic;
        break;
      case "OpenAnswer":
        StatisticComponent = OpenAnswerStatistic;
        break;
      default:
        return null;
    }

    return (
      <StatisticComponent key={question.question_info.id} data={question} />
    );
  };

  return <Container>{stastic.data.map(renderQuestion)}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default StatisticQuestionsContainer;
