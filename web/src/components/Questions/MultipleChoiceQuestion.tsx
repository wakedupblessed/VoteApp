import React, { useState } from "react";
import styled from "styled-components";

import { QuestionAnswer } from "../../api/Polls/interfaces/polls";
import { CustomQuestionProps } from "./interfaces";
import BaseQuestion from "./BaseQuestion";

const MultipleChoiceQuestion = (props: CustomQuestionProps) => {
  const { data: question, onStateChange } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    const isChecked = event.target.checked;

    const newSelectedOptions = isChecked
      ? [...selectedOptions, option]
      : selectedOptions.filter(selectedOption => selectedOption !== option);

    setSelectedOptions(newSelectedOptions);
    const answer: QuestionAnswer = {
      user_id: 0,
      question_id: question.question_info.id,
      open_answer: null,
      single_option_id: null,
      multiple_options: newSelectedOptions,
    };

    onStateChange(answer);
  };

  return (
    <BaseQuestion title={question.question_info.title}>
      <StyledOptionsContainer>
        {question.option_data?.map(option => (
          <label key={option.id}>
            <input
              type="checkbox"
              name={`question-${question.question_info.id}`}
              value={option.id}
              checked={selectedOptions.includes(option.id)}
              onChange={handleOptionChange}
            />
            {option.title}
          </label>
        ))}
      </StyledOptionsContainer>
    </BaseQuestion>
  );
};

export default MultipleChoiceQuestion;

const StyledOptionsContainer = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
