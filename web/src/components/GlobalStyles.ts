import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    font-family: sans-serif;
    margin: 0;
  }
`;

export default GlobalStyles;