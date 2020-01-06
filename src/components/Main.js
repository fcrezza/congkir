import React, { useState } from "react";
import styled from "styled-components";
import Form from "./Form";
import hero from "../assets/hero.svg";
import Modal from "./Modal";
import Result from "./Result";
import CustomError from "./CustomError";

const StyledMain = styled.main`
  flex: 1;
  display: flex;
  padding: 1.5rem 8rem;

  .left-panel {
    width: 55%;
    display: flex;
    flex-direction: column;
  }

  .title {
    margin: 0 0 .5rem 0;
    color: #444;
    font-weight: 700;
    font-size: 1.8rem;
  }

  .subtitle {
    color: #555;
    margin: 0;
    font-size: 1.21rem;
  }

  .hero {
  	margin-top: 2rem;
    background: url(${hero}) no-repeat left bottom;
    background-size: contain;
    flex: 1;
    width: 100%;
  }

  .right-panel {
    width: 40%;
    margin-left: 5%;
  }

  .message {
    color: #de6b95;
    text-align: center;
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
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
	        <p className="subtitle">Rencanakan pengiriman paket</p>
	        <p className="subtitle">anda demi orang tersayang</p>
	        <p className="subtitle">lewat layanan pengiriman</p>
	        <p className="subtitle">terbaik dalam negeri.</p>
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
        <Modal handleToggle={handleToggle} handleResult={handleResult} handleError={handleError}>
          {result ? <Result result={result} /> : null}
          {error ? <CustomError /> : null}
        </Modal>
      ) : null}
    </StyledMain>
  );
};

export default Main;
