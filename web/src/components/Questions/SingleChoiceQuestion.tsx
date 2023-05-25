import React, { useState } from "react";
import styled from "styled-components";

import { QuestionAnswer } from "../../api/Polls/interfaces/polls";
import { CustomQuestionProps } from "./interfaces";
import BaseQuestion from "./BaseQuestion";

const SingleChoiceQuestion = (props: CustomQuestionProps) => {
  const { data, onStateChange } = props;
  const [selectedOption, setAnswer] = useState<string>("");

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const answer = event.target.value;
    setAnswer(answer);
    const questionAnswer: QuestionAnswer = {
      user_id: 0,
      question_id: data.question_info.id,
      open_answer: null,
      single_option_id: answer,
      multiple_options: [],
    };
    onStateChange(questionAnswer);
  };

  return (
    <BaseQuestion title={data.question_info.title}>
      <OptionsContainer>
        {data.option_data?.map(option => (
          <label key={option.id}>
            <input
              type="radio"
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
  );
};

export default SingleChoiceQuestion;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
