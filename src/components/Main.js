import React, { useState } from "react";
import styled from "styled-components";
import Form from "./Form";
import hero from "../assets/hero.svg";
import Modal from "./Modal";
import Result from "./Result";
import CustomError from "./CustomError";

const StyledMain = styled.main`
  display: flex;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }

  .left-panel {
    padding: 2.5rem 0 0 7rem;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1024px) {
      flex-direction: row;
      padding: 2.5rem 4rem 0 4rem;
    }

    @media screen and (max-width: 768px) {
      padding: 2rem 2rem 0 2rem;
    }

    @media screen and (max-width: 480px) {
      text-align: center;
      padding: 2rem 1.5rem 0 1.5rem;
    }
  }

  .title {
    margin: 0 0 1rem 0;
    color: #444;
    font-weight: 700;
    font-size: 1.8rem;
  }

  .subtitle {
    max-width: 330px;
  }

  .subtitle p {
    color: #555;
    margin: 0;
    font-size: 1.3rem;
  }

  .hero {
    margin: 2rem 0;
    background: url(${hero}) no-repeat left bottom;
    background-size: contain;
    width: 600px;
    height: 450px;

    @media screen and (max-width: 1024px) {
      margin: 0 0 0 2rem;
      height: 300px;
      background-position-x: right;
    }

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  .right-panel {
    padding: 2.5rem 7rem 0 0;
    margin-left: auto;

    @media screen and (max-width: 1024px) {
      padding: 3rem 4rem 0 4rem;
      margin-left: 0;
    }

    @media screen and (max-width: 768px) {
      padding: 2.5rem 2rem 0 2rem;
    }

    @media screen and (max-width: 480px) {
      padding: 2.5rem 0 0 0;
    }
  }

  .message {
    color: #de6b95;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1.5rem 0;

    @media screen and (max-width: 1024px) {
      text-align: left;
      margin: 0 0 2rem 0;
    }

    @media screen and (max-width: 480px) {
      margin: 0 0 2rem 1.5rem;
    }
  }
`;

const Main = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleError = value => {
    setError(value);
  };

  const handleToggle = value => {
    setOpen(value);
  };

  const handleResult = data => {
    setResult(data);
  };

  return (
    <StyledMain>
      <div className="left-panel">
        <div>
          <h1 className="title">CEK ONGKOS KIRIM PAKET</h1>
          <div className="subtitle">
            <p>
              Rencanakan pengiriman paket anda demi orang tersayang lewat
              layanan pengiriman terbaik dalam negeri.
            </p>
          </div>
        </div>
        <div className="hero"></div>
      </div>
      <div className="right-panel">
        <h2 className="message">Coba sekarang!</h2>
        <Form
          handleToggle={handleToggle}
          handleError={handleError}
          handleResult={handleResult}
          result={result}
        />
      </div>
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
    </StyledMain>
  );
};

export default Main;
