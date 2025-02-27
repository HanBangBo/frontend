import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/npm/pretendard/dist/web/static/pretendard.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/npm/pretendard/dist/web/static/pretendard.woff') format('woff');
    font-weight: 100 900;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard', sans-serif;
  }
`;

export default GlobalStyle;
