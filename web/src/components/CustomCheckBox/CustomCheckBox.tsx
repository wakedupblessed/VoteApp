import React from "react";
import styled from "styled-components";

interface CheckBoxProps {
  id: string;
  label: string;
  onChange: (value: boolean) => void;
}

const CustomCheckBox = ({ id, label, onChange }: CheckBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <CheckBoxContainer>
      <input type='checkbox' id={`${id}-checkbox`} onChange={handleChange} />
      <label htmlFor={`${id}-checkbox`}>{label}</label>
    </CheckBoxContainer>
  );
};

const CheckBoxContainer = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

export default CustomCheckBox;
