import React, { useCallback, useEffect, useState } from "react";
import { X } from "react-bootstrap-icons";
import styled from "styled-components";

import { QuestionType } from "../../api/Polls/interfaces/polls";
import { StyledInput } from "../GlobalStyles";
import { Checkbox } from "../CustomCheckBox/CheckBox";

interface OptionElementProps {
  placeholder?: string;
  value?: string;
  type: QuestionType.MultipleChoice | QuestionType.SingleChoice;
  isReadonly: boolean;
  onChange?: (value: string) => void;
  onDelete?: () => void;
  handleFakeOption?: () => void;
  inputRef?: React.RefObject<HTMLInputElement> | null;
}

const OptionElement = ({
  placeholder,
  value,
  type,
  isReadonly,
  onChange,
  onDelete,
  handleFakeOption,
  inputRef,
}: OptionElementProps) => {
  useEffect(() => {
    if (inputRef?.current && value && value.startsWith("Variant")) {
      inputRef.current.focus();
    }
  }, [value, inputRef]);

  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleLocalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (handleFakeOption) {
      return;
    }
    console.log();
    setLocalValue(event.target.value);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleFakeOption) {
      return;
    }
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
        value={localValue}
        readOnly={isReadonly}
        onChange={handleLocalChange}
        onBlur={handleBlur}
        ref={inputRef}
        onClick={handleClick}
      />
      {!handleFakeOption && <StyledX onClick={onDelete} />}
    </OptionContainer>
  );
};

const OptionInput = styled(StyledInput)`
  flex-grow: 0.5;
`;

const OptionContainer = styled.div`
  display: flex;
  width: auto;
  align-items: center;
`;

const StyledX = styled(X)`
  width: 1.75rem;
  height: 1.75rem;
  margin-left: 0.25rem;
  cursor: pointer;
`;

export default OptionElement;
