import React, { useRef, useState, useEffect, createRef } from "react";
import styled from "styled-components";

import ListQuestion from "./ListQuestion";
import { QuestionType } from "../../api/Polls/interfaces";

interface ListQuestionProps {
  type: QuestionType.MultipleChoice | QuestionType.SingleChoice;
}

const ListQuestions = ({ type }: ListQuestionProps) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const inputRefs = useRef<(React.RefObject<HTMLInputElement> | null)[]>([]);

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = `Variant ${index}`;
    setQuestions(updatedQuestions);
    inputRefs.current[index] = createRef();
  };

  const handleFakeOption = () => {
    const index = questions.length;
    handleAddOption(index);
  };

  return (
    <div>
      {questions.map((question, index) => (
        <ListQuestion
          key={index}
          placeholder=''
          type={type}
          value={question}
          onChange={(value) => handleQuestionChange(index, value)}
          onDelete={() => handleDeleteQuestion(index)}
          inputRef={inputRefs.current[index]}
        />
      ))}
      <ListQuestion
        placeholder='Add variant'
        type={type}
        value=''
        handleFakeOption={handleFakeOption}
      />
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0px 10px;
`;

export default ListQuestions;
