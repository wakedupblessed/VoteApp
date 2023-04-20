import { useState } from "react";
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
        <div>
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
        </div>
      </BaseQuestion>
    </SingleChoiceQuestionStyled>
  );
};

export default SingleChoiceQuestion;

const SingleChoiceQuestionStyled = styled.div``;
