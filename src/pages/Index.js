import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import "typeface-montserrat";
import Header from "../components/Header";
import Main from "../components/Main";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    font-size: 16px;

    @media screen and (max-width: 480px) {
      font-size: 14px;
    }
  }

  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5;
    background: #fbf9f9;
  }
`;

const Index = () => {
  return (
    <>
      <GlobalStyle />
      <div>
        <Header />
        <Main />
      </div>
    </>
  );
};

export default Index;
