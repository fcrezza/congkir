import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
	background: ${props => (props.active ? "#F4F2F2" : "#DE6B95")}
	color: ${props => (props.active ? "#333" : "#f1eeee")}
	cursor: ${props => (props.active ? "default" : "pointer")}
	border: none;
	padding: .5rem 1rem;
	outline: none;

	&:not(:first-child) {
		border-left: 1px solid #f1eeee;
	}


	&:hover, &:focus {
		background: ${props => (props.active ? null : "#C85880")}
	}
`;

const Button = props => {
	const { active, handleClick, dataId, children } = props;
	return (
		<StyledButton active={active} onClick={handleClick} data-id={dataId}>
			{children}
		</StyledButton>
	);
};

export default Button;

Button.propTypes = {
	active: PropTypes.bool,
	handleClick: PropTypes.func,
	dataId: PropTypes.string
};
