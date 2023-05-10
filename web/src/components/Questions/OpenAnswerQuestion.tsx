import React, { useState } from "react";
import styled from "styled-components";

import { CustomQuestionProps } from "./QuestionInterfaces";
import BaseQuestion from "./BaseQuestion";

const OpenAnswerQuestion = (props: CustomQuestionProps) => {
  const { data: question, onStateChange } = props;
  const [answer, setAnswer] = useState<string>("");

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswer = event.target.value;
    setAnswer(newAnswer);
    onStateChange(question.id, newAnswer);
  };

  return (
    <OpenAnswerQuestionStyled>
      <BaseQuestion index={props.index} title={props.data.title}>
        <div>
          <StyledTextArea id={question.id} onChange={handleAnswerChange} />
        </div>
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
