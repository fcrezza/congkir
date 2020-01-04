import React, { useState } from "react";
import styled from "styled-components";
import Form from "./Form";
import hero from "../assets/hero.svg";
import Modal from './Modal'
import Result from './Result'

const StyledMain = styled.main`
  flex: 1;
  display: flex;
  padding: 2.5rem 8rem;

  .left-panel {
    width: 55%;
    display: flex;
    flex-direction: column;
  }

  .title {
    margin: 0 0 1rem 0;
    color: #444;
    font-weight: 700;
    font-size: 1.9rem;
  }

  .subtitle {
    color: #555;
    margin: 0;
    font-size: 1.3rem;
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
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1.5rem 0;
  }
`;

const Main = () => {
  const [result, setResult] = useState(null)
  
  const handleResult = (data) => {
    setResult(data)
  }

  return (
    <StyledMain>
      <div className="left-panel">
        <h1 className="title">Cek ongkos kirim paket</h1>
        <p className="subtitle">Rencanakan pengiriman paket</p>
        <p className="subtitle">anda demi orang tersayang</p>
        <p className="subtitle">lewat layanan pengiriman</p>
        <p className="subtitle">terbaik dalam negeri.</p>
        <div className="hero"></div>
      </div>
      <div className="right-panel">
        <h2 className="message">Coba sekarang!</h2>
        <Form handleResult={handleResult} />
      </div>
      {result && <Modal>{<Result result={result} />}</Modal>}
    </StyledMain>
  );
};

export default Main;
