import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PollElementContainer } from "../GlobalStyles";
import { StyledInput } from "../GlobalStyles";
import Dropdown, { Option } from "../Dropdown/Dropdown";
import { QuestionType } from "../../api/Polls/interfaces";
import ListQuestions from "../CreateQuestions/ListQuestions";

const PollElement = () => {
  const [selectedOption, setSelectedOption] = useState<QuestionType | null>(
    null
  );
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const enumOptions: Option[] = Object.keys(QuestionType)
      .map((key) => ({
        id: key,
        value: formatOption(QuestionType[key as keyof typeof QuestionType]),
        onClick: () =>
          setSelectedOption(QuestionType[key as keyof typeof QuestionType]),
      }))
      .filter((o) => o.value !== "");

    setOptions(enumOptions);
  }, []);

  const formatOption = (option: QuestionType): string => {
    switch (option) {
      case QuestionType.SingleChoice:
        return "Single Choice";
      case QuestionType.MultipleChoice:
        return "Multiple Choice";
      case QuestionType.OpenAnswer:
        return "Open Answer";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (selectedOption === null && options.length > 0) {
      setSelectedOption(options[0].value as QuestionType);
    }
  }, [selectedOption, options]);

  return (
    <PollElementContainer>
      <BaseSettings>
        <QuestionTitle placeholder='Question title' />
        <Dropdown options={options} />
      </BaseSettings>
      <QuestionContainer>
        {(selectedOption === QuestionType.SingleChoice ||
          selectedOption === QuestionType.MultipleChoice) && (
          <ListQuestions type={selectedOption} /> // Pass selectedOption as type
        )}
        {/* {selectedOption === QuestionType.MultipleChoice && <div>Multiple</div>} */}
        {selectedOption === QuestionType.OpenAnswer && <div>Open</div>}
      </QuestionContainer>
    </PollElementContainer>
  );
};

const BaseSettings = styled.div`
  display: flex;
  gap: 10px;
`;

const QuestionTitle = styled(StyledInput)`
  flex-grow: 1;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

export default PollElement;
