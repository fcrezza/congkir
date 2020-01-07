import React, { memo } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import twitter from "../assets/twitter.svg";
import github from "../assets/github.svg";

const StyledHeader = styled.header`
  background: #de6b95;
  color: #f1eeee;
  padding: 12px 7rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1024px) {
    padding: 12px 4rem;
  }

  @media screen and (max-width: 768px) {
    padding: 12px 2rem;
  }

  @media screen and (max-width: 480px) {
    padding: 12px 1.5rem;
  }

  .brand {
    display: flex;
    align-items: center;
    margin-left: auto;

    @media screen and (max-width: 768px) {
      margin-left: 0;
    }
  }

  .brand img {
    width: 30px;
  }

  .brand .title {
    margin: 0;
    margin-left: 10px;
    font-size: 1.2rem;
  }

  .social-media {
    margin-left: auto;
  }

  .social-media-link {
    display: inline-block;
    padding: 0 8px;
  }

  .social-media-link img {
    width: 20px;
    display: block;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <div className="brand">
        <img src={logo} alt="congkir logo" />
        <h1 className="title">CONGKIR</h1>
      </div>
      <div className="social-media">
        <a href="https://twitter.com/fcrezza" className="social-media-link">
          <img src={twitter} alt="twitter" />
        </a>
        <a
          href="https://github.com/fcrezza/congkir"
          className="social-media-link"
        >
          <img src={github} alt="project repository" />
        </a>
      </div>
    </StyledHeader>
  );
};

export default memo(Header);
