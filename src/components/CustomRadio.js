import React from "react";
import styled from "styled-components";
import { useField } from "formik";
import PropTypes from "prop-types";

const StyledCustomRadio = styled.label.attrs({tabIndex: 0})`
	position: relative;
	display: block;
	width: 100px;
	height: 50px;
	background: ${({active}) => active ? '#dce0ed' : '#f1eeee'};
	cursor: pointer;
	border: none;
	outline: none;
	display: flex;
	align-items: center;
	justify-content: center;

	&:not(:nth-child(3)) {
		margin-right: 20px;
	}

	&:hover,
	&:focus {
		background: #dce0ed;
	}

	& > img {
		width: 60px;
		position: absolute;
	}

	& > input[type="radio"] {
		position: absolute;
		opacity: 0;
	}
`;

const CustomRadio = ({ children, ...props }) => {
	const [field] = useField({ ...props, type: "radio" });
	return (
		<StyledCustomRadio active={field.checked} htmlFor={props.id}>
			<input type="radio" {...field} {...props} />
			{children}
		</StyledCustomRadio>
	);
};

export default CustomRadio;

CustomRadio.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	children: PropTypes.node
};
