import React from "react";
import styled from "styled-components";

const StyledCustomErrorMsg = styled.p`
	font-size: 0.85rem;
	color: #c85880;
`;

const CustomErrorMessage = ({children}) => {
	return <StyledCustomErrorMsg>{children}</StyledCustomErrorMsg>
};

export default CustomErrorMessage;