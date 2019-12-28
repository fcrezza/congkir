import React from "react";
import styled from "styled-components";
import hero from "../assets/hero.svg";

const StyledMain = styled.main`
  flex: 1;
  display: flex;
  padding: 2rem 6rem;

  .left-panel {
    width: 100%;
    max-width: 650px;
    display: flex;
    flex-direction: column;
  }

  .title {
    margin: 0 0 10px 0;
    color: #444;
    font-weight: 700;
    font-size: 1.8rem;
  }

  .subtitle {
    color: #555;
    margin: 0;
    font-size: 1.2rem;
  }

  .hero {
    margin-top: 2rem;
    background: url(${hero}) no-repeat center;
    background-size: contain;
    flex: 1;
    width: 100%;
  }

  .right-panel {
    width: 100%;
    border: 1 dotted;
  }

  .message {
    color: #de6b95;
    text-align: center;
    font-fize: 1.3rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
  }
`;

const Main = () => {
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
      </div>
    </StyledMain>
  );
};

export default Main;
