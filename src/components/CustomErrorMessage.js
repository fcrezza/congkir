import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

const StyledCustomErrorMsg = styled.div`
	height: 20px;
	font-size: 0.8rem;
	color: #c85880;
`;

const CustomErrorMessage = ({ name }) => {
	return (
		<StyledCustomErrorMsg>
			<ErrorMessage name={name} />
		</StyledCustomErrorMsg>
	);
};

export default CustomErrorMessage;

CustomErrorMessage.propTypes = {
	name: PropTypes.string
}