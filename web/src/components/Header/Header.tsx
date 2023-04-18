import styled from "styled-components";
import Button, { ButtonStyle } from "../Button/Button";

const buttonStyle: ButtonStyle = {
  backgroundColor: "white",
  textColor: "black",
  hoverBackgroundColor: "rgba(255, 255, 255, 0.8)",
};

export const Header = () => {
  return (
    <HeaderArea>
      <ButtonContainer>
        <Button label='Button 1' onClick={() => {}} buttonStyle={buttonStyle} />
        <Button label='Button 2' onClick={() => {}} buttonStyle={buttonStyle} />
        <Button label='Button 3' onClick={() => {}} buttonStyle={buttonStyle} />
      </ButtonContainer>
    </HeaderArea>
  );
};

const HeaderArea = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 150px;
  background: linear-gradient(90deg, #baa0e6, #e6d1f6);
  animation: 15s linear 0s infinite alternate none running granimate;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: ;
`;
