import { createGlobalStyle, keyframes } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
  }

  html, body {
    margin: 0;
    height: 100%;
  }

  p, h1, h2, h3 {
    padding: 0;
    margin: 0;
  }
`;

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

export default GlobalStyles;
