import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles({
	root: {
		background: "#ff5252",
		margin: "12px 0",
		padding: "1rem",
		color: "#fff"
	}
});

const ErrorMessages = ({ text }) => {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<Typography variant="subtitle1">{text}</Typography>
		</Box>
	);
};

export default ErrorMessages;

ErrorMessages.propTypes = {
	text: PropTypes.string.isRequired
};
