import React, { useState } from "react";
import styled, {createGlobalStyle} from 'styled-components'
import 'typeface-montserrat'
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
`

const Container = styled.div`
  background: #FBF9F9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Index = () => {
  const [courier, setCourier] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    error: false,
    type: ""
  });

  const handleError = value => {
    setIsError(value);
  };

  const handleLoading = () => {
    setIsLoading(prev => !prev);
  };

  const handleResult = value => {
    setResult(value);
  };

  const handleChange = ({ target }) => {
    setCourier(target.dataset.value);
  };

  return (
    <>
    <GlobalStyle />
    <Container>
      <Header />
      <Main />
    </Container>
    </>
  )
    /*
      <CssBaseline />
      <Container maxWidth="sm">
        <Header />
        <Paper square={true} className={classes.paper}>
          {isError.error && isError.type === "network error" ? (
            <ErrorMessages text="Pastikan anda memiliki koneksi internet yang stabil" />
          ) : null}
          <Typography variant="subtitle2">Pilih kurir</Typography>
          <Box className={classes.boxWrapper}>
            <a
              href="##"
              className={clsx(classes.kurirSelector, {
                [classes.active]: courier === "jne"
              })}
              onClick={handleChange}
              data-value="jne"
            >
              <img src={jne} className={classes.kurirImage} alt="jne logo" />
            </a>
            <a
              href="##"
              className={clsx(classes.kurirSelector, {
                [classes.active]: courier === "pos"
              })}
              onClick={handleChange}
              data-value="pos"
            >
              <img src={pos} className={classes.kurirImage} alt="pos logo" />
            </a>
            <a
              href="##"
              className={clsx(classes.kurirSelector, {
                [classes.active]: courier === "tiki"
              })}
              onClick={handleChange}
              data-value="tiki"
            >
              <img src={tiki} className={classes.kurirImage} alt="tiki logo" />
            </a>
          </Box>
          <Box>
            <FormContainer
              courier={courier}
              handleLoading={handleLoading}
              handleResult={handleResult}
              handleError={handleError}
            />
          </Box>
          {isLoading && !result ? (
            <Box className={classes.loading}>
              <CircularProgress />
            </Box>
          ) : null}
          {isError.error && isError.type === "invalid input" ? (
            <ErrorMessages text="Pastikan anda memasukan input dengan benar dan memiliki koneksi internet yang stabil" />
          ) : null}
          {result ? <Result result={result} /> : null}
        </Paper>
      </Container>
    */
};

export default Index;
