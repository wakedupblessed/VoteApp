import React, { useEffect } from "react";
import { StyledInput } from "../GlobalStyles";
import { X, Square, Circle } from "react-bootstrap-icons";
import { QuestionType } from "../../api/Polls/interfaces";
import styled from "styled-components";

interface ListQuestionProps {
  placeholder?: string;
  value?: string;
  type: QuestionType.MultipleChoice | QuestionType.SingleChoice;
  onChange?: (value: string) => void;
  onDelete?: () => void;
  handleFakeOption?: () => void;
  inputRef?: React.RefObject<HTMLInputElement> | null;
}

const Checkbox = ({
  type,
}: {
  type: QuestionType.MultipleChoice | QuestionType.SingleChoice;
}) => {
  return (
    <>
      {type === QuestionType.MultipleChoice ? (
        <StyledSquare />
      ) : (
        <StyledCircle />
      )}
    </>
  );
};

const ListQuestion = ({
  placeholder,
  value,
  type,
  onChange,
  onDelete,
  handleFakeOption,
  inputRef,
}: ListQuestionProps) => {
  useEffect(() => {
    if (inputRef?.current && value && value.startsWith("Variant")) {
      inputRef.current.focus();
    }
  }, [value, inputRef]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (handleFakeOption) {
      e.stopPropagation();
      handleFakeOption();
    }
  };

  return (
    <OptionContainer>
      <Checkbox type={type} />
      <OptionInput
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        ref={!handleFakeOption ? inputRef : null}
        onClick={handleClick}
      />
      {!handleFakeOption && <StyledX onClick={onDelete} />}
    </OptionContainer>
  );
};

const OptionInput = styled(StyledInput)`
  flex-grow: 1;
`;

const OptionContainer = styled.div`
  display: flex;
  width: auto;
  align-items: center;
`;

const StyledX = styled(X)`
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
`;

const StyledSquare = styled(Square)`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.5rem;
`;

const StyledCircle = styled(Circle)`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.5rem;
`;

export default ListQuestion;
