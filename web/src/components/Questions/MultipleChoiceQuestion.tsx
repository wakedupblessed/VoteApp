import React, { useState } from "react";
import styled from "styled-components";

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
      : selectedOptions.filter((selectedOption) => selectedOption !== option);

    setSelectedOptions(newSelectedOptions);
    onStateChange(question.question_info.id, newSelectedOptions);
  };

  return (
    <BaseQuestion title={question.question_info.title}>
      <StyledOptionsContainer>
        {question.option_data?.map((option) => (
          <label key={option.id}>
            <input
              type='checkbox'
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
