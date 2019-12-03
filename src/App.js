import React, { useState } from "react";
import {
  CssBaseline,
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Header from "./components/Header";
import Result from "./components/Result";
import FormContainer from "./components/FormContainer";
import ErrorMessages from "./components/ErrorMessages";
import tiki from "./img/tiki.png";
import pos from "./img/pos.png";
import jne from "./img/jne.png";

const useStyles = makeStyles({
  paper: {
    padding: "1.5rem"
  },
  boxWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "1rem 0"
  },
  kurirSelector: {
    display: "flex",
    alignItems: "center",
    width: 80,
    height: 60,

    "&:hover": {
      background: "#eee"
    },
    "&:focus": {
      background: "#eee"
    }
  },
  kurirImage: {
    maxWidth: "100%",
    display: "block",
    pointerEvents: "none"
  },
  label: {
    marginTop: "1.5rem"
  },
  active: {
    background: ({ highlighted }) => highlighted && "#eee"
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  }
});

const App = () => {
  const [courier, setCourier] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    error: false,
    type: ""
  });

  const classes = useStyles({ highlighted: courier });

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
    </>
  );
};

export default App;
