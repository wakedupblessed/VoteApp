import React, { useState } from "react";
import styled from "styled-components";

import { CustomQuestionProps } from "./interfaces";
import BaseQuestion from "./BaseQuestion";

const OpenAnswerQuestion = (props: CustomQuestionProps) => {
  const { index, data, onStateChange } = props;
  const [answer, setAnswer] = useState<string>("");

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newAnswer = event.target.value;
    setAnswer(newAnswer);
    onStateChange(data.question_info.id, newAnswer);
  };

  return (
    <OpenAnswerQuestionStyled>
      <BaseQuestion index={props.index} title={data.question_info.title}>
        <StyledTextArea
          id={data.question_info.id}
          onChange={handleAnswerChange}
        />
      </BaseQuestion>
    </OpenAnswerQuestionStyled>
  );
};

export default OpenAnswerQuestion;

const OpenAnswerQuestionStyled = styled.div``;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 5rem;
  font-size: 15px;
  resize: none;
`;
