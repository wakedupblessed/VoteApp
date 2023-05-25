import React, { useState } from "react";
import styled from "styled-components";

import { CustomQuestionProps } from "./interfaces";
import BaseQuestion from "./BaseQuestion";
import { StyledInput } from "../GlobalStyles";

const OpenAnswerQuestion = (props: CustomQuestionProps) => {
  const { data, onStateChange } = props;
  const [answer, setAnswer] = useState<string>("");

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswer = event.target.value;
    setAnswer(newAnswer);
    onStateChange(data.question_info.id, newAnswer);
  };

  return (
    <BaseQuestion title={data.question_info.title}>
      <AnswerInput
        id={data.question_info.id}
        placeholder='Enter answer'
        onChange={handleAnswerChange}
      />
    </BaseQuestion>
  );
};

const AnswerInput = styled(StyledInput)`
  flex-grow: 1;
  /* width: 100%; */
`;

export default OpenAnswerQuestion;
