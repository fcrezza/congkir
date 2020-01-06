import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import close from "../assets/close.svg";
import ModalWrapper from "./ModalWrapper";

const StyledModal = styled.div`
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
		max-width: 570px;
		width: 90%;
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

const Modal = props => {
	const { children, handleToggle, handleError, handleResult } = props;
	const ref = useRef();

	const handleClickOutside = e => {
		if (e.target === ref.current) {
			handleToggle(false);
			handleError(false);
			handleResult(null);
		}
	};

	const handleClickInside = () => {
		handleToggle(false);
		handleError(false)
		handleResult(null);
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<ModalWrapper>
			<StyledModal ref={ref}>
				<div className="content">
					<button className="close-btn" onClick={handleClickInside}>
						<img src={close} alt="" />
					</button>
					{children}
				</div>
			</StyledModal>
		</ModalWrapper>
	);
};

export default Modal;

Modal.propTypes = {
	children: PropTypes.node,
	handleToggle: PropTypes.func,
	handleError: PropTypes.func,
	handleResult: PropTypes.func

};
