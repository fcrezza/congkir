import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledCustomErrorMsg = styled.p`
	font-size: 0.85rem;
	color: #c85880;
`;

const CustomErrorMessage = ({ msg }) => {
	console.log(msg)
	return <StyledCustomErrorMsg>{msg}</StyledCustomErrorMsg>
};

export default CustomErrorMessage;

CustomErrorMessage.propTypes = {
	msg: PropTypes.string.isRequired
};
