import React, { useState } from "react";
import styled from "styled-components";

import { CheckBoxWithInputArea } from "../../components/GlobalStyles";
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";

interface DeadLineInputProps {
  onChange: (value: string | null) => void;
}

const DeadlineInput = ({ onChange }: DeadLineInputProps) => {
  const [deadline, setDeadline] = useState<boolean>(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <DateCheckBoxWithInputArea>
      <CustomCheckBox
        id="deadline"
        label="Poll has deadline"
        onChange={setDeadline}
      />
      {deadline && <StyledDateInput type="date" onChange={handleDateChange} />}
    </DateCheckBoxWithInputArea>
  );
};

const StyledDateInput = styled.input`
  width: 200px;
  font-size: 14px;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-color: #ccc;

  &:focus {
    outline: none;
  }
  flex-grow: 1;
`;

const DateCheckBoxWithInputArea = styled(CheckBoxWithInputArea)`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

export default DeadlineInput;
