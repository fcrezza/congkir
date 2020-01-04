import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");
const modalContainer = document.createElement("div");

const Modal = ({ children }) => {
	useEffect(() => {
		modalRoot.appendChild(modalContainer);

		return () => {
			modalRoot.removeChild(modalContainer)
		};
	}, []);

	return createPortal(children, modalContainer);
};

export default Modal;
