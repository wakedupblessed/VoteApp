import styled, { createGlobalStyle, keyframes, css } from "styled-components";

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

const commonStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 3px;
  padding: 20px;
  box-sizing: border-box;
`;

export const DefaultContainer = styled.div`
  ${commonStyles}
  margin-top: 20px;
  width: 800px;
  font-weight: normal;
  border: 1px solid #d3d3d3;
`;

export const GradientStyles = css`
  border: none;

  &:after {
    content: "";
    position: absolute;
    top: calc(-1 * 3px);
    left: calc(-1 * 3px);
    height: calc(100% + 3px * 2);
    width: calc(100% + 3px * 2);
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    border-radius: calc(2 * 3px);
    z-index: -1;
    animation: ${gradientAnimation} 15s ease infinite;
    background-size: 400% 400%;
  }
`;

export const FullTimeGradientContainer = styled(DefaultContainer)`
  ${GradientStyles}
`;

export const GradientContainer = styled.div`
  ${commonStyles}
  ${GradientStyles}
  width: 600px;
  gap: 15px;

  &:after {
    background-size: 600% 600%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover:after {
    opacity: 1;
  }
`;

export default GlobalStyles;
