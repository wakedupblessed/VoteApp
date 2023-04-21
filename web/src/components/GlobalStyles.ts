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

}

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

  /* border-top: 1px solid #ccc;
  margin: 20px 0; */
`;

export default GlobalStyles;
