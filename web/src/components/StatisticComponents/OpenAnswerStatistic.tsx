import React, { useState } from "react";
import { StatisticComponentProps } from "./interfaces";
import BaseQuestion from "../Questions/BaseQuestion";
import { StyledInput } from "../GlobalStyles";
import styled from "styled-components";

const OpenAnswerStatistic = (statistic: StatisticComponentProps) => {
  const { data, isAnonymous } = statistic;

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const renderStatistic = () => {
    if (isAnonymous) {
      return data.answer?.map(item => (
        <Container>
          {item.username}
          <StyledInput placeholder={item.answer} readOnly />
        </Container>
      ));
    }

    return data.answer?.map(item => (
      <StyledInput placeholder={item.answer} readOnly />
    ));
  };

  return (
    <BaseQuestion title={data.question_info.title}>
      <StyledButton onClick={toggleVisibility}>
        {isVisible ? "Hide Section" : "Show Section"}
      </StyledButton>
      {isVisible && renderStatistic()}
    </BaseQuestion>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledButton = styled.button`
  background-color: white;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

export default OpenAnswerStatistic;
