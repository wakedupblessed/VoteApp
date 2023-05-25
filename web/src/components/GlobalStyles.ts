import styled, { createGlobalStyle, keyframes } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
  }

  html, body {
    margin: 0;
    height: 100%;
  }

  p, h1, h2, h3, h4 {
    padding: 0;
    margin: 0;
  }
`;

export const StyleValues = {
  bigFontWeght: "26px",
  commonFontWeight: "18px",
  smallFontWeight: "16px",
  gradiente: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
};

export const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const StyledHr = styled.hr`
  width: 100%;
  height: 3px;
  border-radius: 2px;
  border: none;
  background: ${StyleValues.gradiente};
  animation: ${gradientAnimation} 15s ease infinite;
  background-size: 400% 400%;
`;

export const StyledInput = styled.input`
  width: 200px;
  font-size: 18px;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-color: #ccc;

  &:focus {
    outline: none;
  }
`;

export const StyledTextArea = styled.input`
  height: 50px;
  width: auto;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;

  &:focus {
    outline: none;
  }
`;

export const StyledButton = styled.button`
  width: fit-content;
  padding: 12px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: normal;
  line-height: 16px;
  color: #fff;
  background-color: #000;
  border: 1px solid black;

  &:hover {
    outline: none;
    cursor: pointer;
    background-color: #fff;
    color: #000;
  }

  &:active {
    outline: none;
    background-color: #fff;
    color: #000;
  }
`;

export const CheckBoxWithInputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PollElementContainer = styled.div`
  width: 600px;
  padding: 20px;
  border-radius: 3px;
  flex-direction: column;
  display: flex;
  gap: 15px;
  position: relative;
  background: white; // your desired non-animated background color
  box-sizing: border-box;

  &:before,
  &:after {
    content: "";
    position: absolute;
    box-sizing: border-box;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 3px; // container's border-radius + border-width
  }

  &:before {
    z-index: -1;
    background: #ccc; // your default border color
  }

  &:after {
    z-index: -2;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 600% 600%;
    animation: ${gradientAnimation} 20s ease infinite;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover:before {
    opacity: 0;
  }

  &:hover:after {
    opacity: 1;
  }
`;

export default GlobalStyles;
