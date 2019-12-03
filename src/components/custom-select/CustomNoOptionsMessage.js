import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const CustomNoOptionsMessage = props => {
	return (
		<Typography
			color="textSecondary"
			className={props.selectProps.classes.noOptionsMessage}
			{...props.innerProps}
		>
			{props.children}
		</Typography>
	);
};

export default CustomNoOptionsMessage;

CustomNoOptionsMessage.propTypes = {
	/**
	 * The children to be rendered.
	 */
	children: PropTypes.node,
	/**
	 * Props to be passed on to the wrapper.
	 */
	innerProps: PropTypes.object.isRequired,
	selectProps: PropTypes.object.isRequired
};
