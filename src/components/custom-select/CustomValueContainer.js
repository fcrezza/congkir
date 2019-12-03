import React from "react";
import PropTypes from "prop-types";

const CustomValueContainer = props => {
	return (
		<div className={props.selectProps.classes.valueContainer}>
			{props.children}
		</div>
	);
};

export default CustomValueContainer;

CustomValueContainer.propTypes = {
	/**
	 * The children to be rendered.
	 */
	children: PropTypes.node,
	selectProps: PropTypes.object.isRequired
};
