import React, { useState, useRef, useEffect } from "react";
import { createGlobalStyle, css } from "styled-components";
import "typeface-montserrat";
import Header from "../components/Header";
import Main from "../components/Main";
import Result from "../components/Result";
import Modal from "../components/Modal";
import CustomError from "../components/CustomError";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    width: 100%;
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

    ${({open}) => open && css`
      overflow: hidden;
    `}
  }
`;

const Index = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const bodyTop = useRef()

  if (!open) {
    window.scrollTo(0, bodyTop.current);
  }

  const handleScroll = ({path}) => {
    bodyTop.current = path[1].scrollY
  }

  const handleError = value => {
    setError(value);
  };

  const handleToggle = value => {
    setOpen(value);
  };

  const handleResult = data => {
    setResult(data);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  },  [])

  return (
    <>
      <GlobalStyle open={open}/>
      <Header />
      <Main
        handleError={handleError}
        handleResult={handleResult}
        handleToggle={handleToggle}
      />
      {open ? (
        <Modal
          handleToggle={handleToggle}
          handleResult={handleResult}
          handleError={handleError}
        >
          {result ? <Result result={result} /> : null}
          {error ? <CustomError /> : null}
        </Modal>
      ) : null}
    </>
  );
};

export default Index;
