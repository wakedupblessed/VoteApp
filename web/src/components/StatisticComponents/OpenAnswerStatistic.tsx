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
      return data.option_data?.map((item, index) => (
        <StyledInput key={index} placeholder={item.answer} readOnly />
      ));
    }

    return data.option_data?.map((item, index) => (
      <ContainerItem key={index}>
        {item.username}
        <StyledInput placeholder={item.answer} readOnly />
      </ContainerItem>
    ));
  };

  return (
    <BaseQuestion title={data.question_info.title}>
      <Container>
        <StyledButton onClick={toggleVisibility}>
          {isVisible ? "Hide Section" : "Show Section"}
        </StyledButton>
        {isVisible && renderStatistic()}
      </Container>
    </BaseQuestion>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 20px;
`;

const ContainerItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
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
