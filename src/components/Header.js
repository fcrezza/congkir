import React, { memo } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import twitter from "../assets/twitter.svg";
import github from "../assets/github.svg";

const StyledHeader = styled.header`
  background: #DE6B95;
  color: #f1eeee
  padding: 10px 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .brand {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .brand img {
    width: 30px;
  }

  .brand .title {
    margin: 0;
    margin-left: 10px;
    font-size: 1.3rem;
  }

  .social-media {
    margin-left: auto;
  }

  .social-media-link:nth-child(2) {
    margin-left: 14px;
  }

  .social-media-link img {
    width: 20px;    
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
        <a href="" className="social-media-link">
          <img src={github} alt="project repository" />
        </a>
      </div>
    </StyledHeader>
  );
};

export default memo(Header);
