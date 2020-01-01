import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Form from "./Form";
import hero from "../assets/hero.svg";

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

const getData = url => {
  return axios.get(`https://cors-anywhere.herokuapp.com/${url}`, {
    headers: {
      key: process.env.REACT_APP_RAJA_ONGKIR_API_KEY
    }
  });
};

const Main = () => {
  const provinces = JSON.parse(localStorage.getItem("provinces"));
  let cities = JSON.parse(localStorage.getItem("cities"));

  useEffect(() => {
    if (!cities) {
      const getProvinces = getData(
        "https://api.rajaongkir.com/starter/province"
      );
      const getCities = getData("https://api.rajaongkir.com/starter/city");

      axios
        .all([getProvinces, getCities])
        .then(
          axios.spread((resProv, resCities) => {
            let finalCities = [];
            resProv.data.rajaongkir.results.forEach(province => {
              const filterCities = resCities.data.rajaongkir.results
                .filter(city => city.province_id === province.province_id)
                .map(city => ({
                  id: city.city_id,
                  value: `${city.city_name}, ${province.province}`,
                  label: `${city.city_name}, ${province.province}`
                }));
              finalCities = [...finalCities, ...filterCities];
            });
            cities = finalCities;
            localStorage.setItem("cities", JSON.stringify(cities));
          })
        )
        .catch(
          err => console.log(err)
          //   // handleError({
          //   //   error: true,
          //   //   type: "network error"
          //   // })
        );
    }
  }, []);

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
        <Form cities={cities} />
      </div>
    </StyledMain>
  );
};

export default Main;
