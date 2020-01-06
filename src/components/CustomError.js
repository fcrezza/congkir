import React from "react";
import styled from "styled-components";

const StyledError = styled.div`
	.title,
	.subtitle {
		margin: 0;
		color: #333;
	}

	.title {
		color: #DE6B95;
		margin-bottom: .8rem;
	}
`;

const CustomError = () => {
	return (
		<StyledError>
			<div className="hero"></div>
			<h2 className="title">Upzz, ada yang tidak beres</h2>
			<p className="subtitle">
				Pastikan koneksi internet kamu stabil.
			</p>
		</StyledError>
	);
};

export default CustomError;
