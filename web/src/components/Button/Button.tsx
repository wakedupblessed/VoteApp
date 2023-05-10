import React, { ReactElement } from "react";
import styled from "styled-components";

export interface ButtonStyle {
  backgroundcolor: string;
  textcolor: string;
  hoverbackgroundcolor: string;
}

interface ButtonProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonStyle?: ButtonStyle;
}

const Button = (props: ButtonProps): ReactElement => {
  const defaultButtonStyle: ButtonStyle = {
    backgroundcolor: "white",
    textcolor: "black",
    hoverbackgroundcolor: "rgba(255, 255, 255, 0.8)",
  };

  const finalButtonStyle = { ...defaultButtonStyle, ...props.buttonStyle };

  return (
    <StyledButton onClick={props.onClick} {...finalButtonStyle}>
      {props.label}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonStyle>`
  background-color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin-left: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
