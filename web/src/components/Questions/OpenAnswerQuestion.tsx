import React, { useState } from "react";
import styled from "styled-components";

import { QuestionAnswer } from "../../api/Polls/interfaces/polls";
import { CustomQuestionProps } from "./interfaces";
import BaseQuestion from "./BaseQuestion";
import { StyledInput } from "../GlobalStyles";

const OpenAnswerQuestion = (props: CustomQuestionProps) => {
  const { data, onStateChange } = props;
  const [answer, setAnswer] = useState<string>("");

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const openAnswer = event.target.value;
    setAnswer(openAnswer);
    const answer: QuestionAnswer = {
      user_id: 0,
      question_id: data.question_info.id,
      open_answer: openAnswer,
      single_option_id: null,
      multiple_options: [],
    };
    onStateChange(answer);
  };

  return (
    <BaseQuestion title={data.question_info.title}>
      <AnswerInput
        id={data.question_info.id}
        placeholder="Enter answer"
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
