import React, { useState } from "react";
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
    <CheckBoxWithInputArea>
      <CustomCheckBox
        id='deadline'
        label='Poll has deadline'
        onChange={setDeadline}
      />
      {deadline && (
        <>
          <input type='date' onChange={handleDateChange} />
        </>
      )}
    </CheckBoxWithInputArea>
  );
};

export default DeadlineInput;
