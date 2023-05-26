import React from "react";
import { StatisticComponentProps } from "./interfaces";
import BaseQuestion from "../Questions/BaseQuestion";
import { StyledInput } from "../GlobalStyles";

const OpenAnswerStatistic = (statistic: StatisticComponentProps) => {
  const { data } = statistic;

  return (
    <BaseQuestion title={data.question_info.title}>
      <StyledInput placeholder={data.answer} readOnly />
    </BaseQuestion>
  );
};

export default OpenAnswerStatistic;
