import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import close from "../assets/close.svg";

const StyledWrapper = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.3);

	.content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 600px;
		width: 80%;
		background: #fffdfd;
		padding: 1.5rem 2rem;
		border-radius: 20px;
	}

	.close-btn {
		position: absolute;
		top: 20px;
		right: 25px;
		border: none;
		background: transparent;
		cursor: pointer;
		outline: none;
	}

	.close-btn img {
		width: 85%;
		display: block;
	}
`;

const ModalWrapper = ({ children }) => {
	return (
		<StyledWrapper>
			<div className="content">
				<button className="close-btn">
					<img src={close} alt="" />
				</button>
				{children}
			</div>
		</StyledWrapper>
	);
};

export default ModalWrapper;

ModalWrapper.propTypes = {
	children: PropTypes.element
};
