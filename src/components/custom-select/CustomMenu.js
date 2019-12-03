import React from "react";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";

const CustomMenu = props => {
	return (
		<Paper
			square
			className={props.selectProps.classes.paper}
			{...props.innerProps}
		>
			{props.children}
		</Paper>
	);
};

export default CustomMenu;

CustomMenu.propTypes = {
	/**
	 * The children to be rendered.
	 */
	children: PropTypes.element.isRequired,
	/**
	 * Props to be passed to the menu wrapper.
	 */
	innerProps: PropTypes.object.isRequired,
	selectProps: PropTypes.object.isRequired
};
