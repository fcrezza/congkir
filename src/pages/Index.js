import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import "typeface-montserrat";
import Header from "../components/Header";
import Main from "../components/Main";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5;
  }
`;

const Container = styled.div`
  background: #fbf9f9;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Index = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <Main />
      </Container>
    </>
  );
};

export default Index;
