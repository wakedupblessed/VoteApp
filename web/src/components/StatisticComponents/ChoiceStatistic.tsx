import React from "react";
import styled from "styled-components";

import { StatisticComponentProps } from "./interfaces";
import { OptionStatisticDTO } from "../../api/Polls/interfaces/polls";
import BaseQuestion from "../Questions/BaseQuestion";

const ChoiceStatistic = (statistic: StatisticComponentProps) => {
  const { data } = statistic;

  return (
    <BaseQuestion title={statistic.data.question_info.title}>
      <Container>
        {data.option_data?.map((option: OptionStatisticDTO) => (
          <Option key={option.id}>
            <OptionDetails>
              <OptionVotes>{option.votes_percent}%</OptionVotes>
              <OptionTitle>{option.title}</OptionTitle>
            </OptionDetails>
            <OptionBarContainer>
              <OptionBarFill style={{ width: `${option.votes_percent}%` }} />
            </OptionBarContainer>
          </Option>
        ))}
      </Container>
    </BaseQuestion>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px 0;
  width: 100%;
`;

const OptionDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const OptionTitle = styled.div`
  flex-basis: 80%;
  font-size: 16px;
`;

const OptionVotes = styled.div`
  flex-basis: 20%;
  text-align: left;
  font-size: 16px;
  margin-right: 10px;
`;

const OptionBarContainer = styled.div`
  flex-grow: 1;
  height: 5px;
  background-color: #ddd;
  margin: 10px 0;
  border-radius: 5px;
  width: 150%;
  overflow: hidden;
`;

const OptionBarFill = styled.div`
  height: 100%;
  background-color: #6c5ce7;
`;

export default ChoiceStatistic;
