import React, { useState } from "react";
import styled from "styled-components";

import { CustomQuestionProps } from "./QuestionInterfaces";
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
    onStateChange(question.id, newSelectedOptions);
  };

  return (
    <MultipleChoiceQuestionStyled>
      <BaseQuestion index={props.index} title={props.data.title}>
        <div>
          {question.options.map((option) => (
            <label key={option.id}>
              <input
                type='checkbox'
                name={`question-${question.id}`}
                value={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={handleOptionChange}
              />
              {option.title}
            </label>
          ))}
        </div>
      </BaseQuestion>
    </MultipleChoiceQuestionStyled>
  );
};

export default MultipleChoiceQuestion;

const MultipleChoiceQuestionStyled = styled.div``;
