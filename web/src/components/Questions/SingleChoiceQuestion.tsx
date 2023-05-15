import React, { useState } from "react";
import styled from "styled-components";

import { CustomQuestionProps } from "./QuestionInterfaces";
import BaseQuestion from "./BaseQuestion";

const SingleChoiceQuestion = (props: CustomQuestionProps) => {
  const { data: question, onStateChange } = props;
  const [selectedOption, setAnswer] = useState<string>("");

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswer = event.target.value;
    setAnswer(newAnswer);
    onStateChange(question.id, newAnswer);
  };

  return (
    <SingleChoiceQuestionStyled>
      <BaseQuestion index={props.index} title={props.data.title}>
        <OptionsContainer>
          {props.data.options.map((option) => (
            <label key={option.id}>
              <input
                type='radio'
                name={props.data.id}
                value={option.id}
                checked={selectedOption === option.id}
                onChange={handleAnswerChange}
              />
              {option.title}
            </label>
          ))}
        </OptionsContainer>
      </BaseQuestion>
    </SingleChoiceQuestionStyled>
  );
};

export default SingleChoiceQuestion;

const SingleChoiceQuestionStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
