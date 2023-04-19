import { createGlobalStyle } from 'styled-components';

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
    marging: 0;
  }
`;

export default GlobalStyles;