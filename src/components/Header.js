import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@material-ui/core";
const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box mx="auto">
          <Typography align="center" variant="h6">
            CONGKIR
          </Typography>
          <Typography align="center" variant="subtitle1">
            CEK ONGKOS KIRIM PAKET
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
