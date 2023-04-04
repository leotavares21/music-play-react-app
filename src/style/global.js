import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --dark: #222;
    --light: #fff;
    --secondary: #f1f1f1;
    --info: #112233;
    --primary: #FC575E;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,body {
    width: 100%;
    height: 100%;
  }

  body {
    background: var(--light);
    scroll-behavior: smooth;
  }

  body, input, textarea, button {
    font: 400 1rem 'Recursive', sans-serif;
    color: var(--info);
  }

  h1,h2, h3, h4, h5, h6{
    font-family: 'Kanit', sans-serif;;
    font-weight: 600;
  }

  h1 {
    font-size: 3rem;
    color: var(--dark);
    margin-bottom: 3rem;
  }

  h2, h3 {
    color: var(--primary);
    font-size: 2rem;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    border: none;
  }

`;
