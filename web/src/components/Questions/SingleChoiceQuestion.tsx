import React, { useState } from "react";
import styled from "styled-components";

import { CustomQuestionProps } from "./interfaces";
import BaseQuestion from "./BaseQuestion";

const SingleChoiceQuestion = (props: CustomQuestionProps) => {
  const { data, onStateChange } = props;
  const [selectedOption, setAnswer] = useState<string>("");

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswer = event.target.value;
    setAnswer(newAnswer);
    onStateChange(data.question_info.id, newAnswer);
  };

  return (
    <SingleChoiceQuestionStyled>
      <BaseQuestion index={props.index} title={data.question_info.title}>
        <OptionsContainer>
          {data.option_data?.map((option) => (
            <label key={option.id}>
              <input
                type='radio'
                name={`question-${data.question_info.id}`}
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
