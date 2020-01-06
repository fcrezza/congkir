import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "./Button";

const StyledResult = styled.div`
	.title {
		margin:  0 0 1.5rem 0;
	}

	.title span {
		left: 0;
		font-size: 1.5rem;
		color: #DE6B95;
		padding-right: 30px
		border-bottom: 3px solid #DE6B95;
	}

	.result-container {
		margin-left: 14px;
	}

	.result-value {
		color: #333;
		margin-bottom: 1rem;
	}

	.left, .right {
		display: inline-block;
	}

	.left {
		width: 35%;
	}

	.right {
		width: 65%;
	}

	.result-value h3 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
	}

	.ekspedisi-container {
		background: #F4F2F2;
		padding: 1rem;
	}

	.ekspedisi-result:not(:last-child) {
		margin-bottom: .8rem;
	}

	.ekspedisi-left, .ekspedisi-right {
		display: inline-block;
	}

	.ekspedisi-left {
		width: 20%;
		font-weight: 600;
	}

	.ekspedisi.right {
		width: 80%
	}
`;

const Result = ({ result }) => {
	const [active, setActive] = useState("");
	const { origin_details, destination_details, results, query } = result;
	const ekspedisiFilter = results[0].costs
		.filter(result => result.service === active)
		.map(result => ({
			service: result.description,
			price: result.cost[0].value,
			etd: result.cost[0].etd
		}));

	useEffect(() => {
		setActive(results[0].costs[0].service);
	}, []);

	const handleClick = e => {
		setActive(e.target.dataset.id);
	};

	return (
		<StyledResult>
			<h1 className="title">
				<span>Hasil</span>
			</h1>
			<div className="result-container">
				<div className="result-value">
					<div className="left">
						<h3>Service:</h3>
					</div>
					<div className="right">
						<span className="value">{results[0].name}</span>
					</div>
				</div>
				<div className="result-value">
					<div className="left">
						<h3>Asal:</h3>
					</div>
					<div className="right">
						<span className="value">{`${origin_details.city_name}, ${origin_details.province}`}</span>
					</div>
				</div>
				<div className="result-value">
					<div className="left">
						<h3>Tujuan:</h3>
					</div>
					<div className="right">
						<span className="value">{`${destination_details.city_name}, ${origin_details.province}`}</span>
					</div>
				</div>
				<div className="result-value">
					<div className="left">
						<h3>Berat barang:</h3>
					</div>
					<div className="right">
						<span className="value">{query.weight} Gram</span>
					</div>
				</div>
				<div className="result-value">
					<h3>Jenis ekspedisi:</h3>
				</div>
				<div>
					<div className="btn-group">
						{results[0].costs.map(x => (
							<Button
								key={x.service}
								active={active === x.service}
								handleClick={handleClick}
								dataId={x.service}
							>
								{x.service}
							</Button>
						))}
					</div>
					{ekspedisiFilter.length > 0 && (
						<div className="ekspedisi-container">
							<div className="ekspedisi-result">
								<div className="ekspedisi-left">
									<span>Ekspedisi:</span>
								</div>
								<div className="ekspedisi-right">
									<span className="evalue">{ekspedisiFilter[0].service}</span>
								</div>
							</div>
							<div className="ekspedisi-result">
								<div className="ekspedisi-left">
									<span>Harga:</span>
								</div>
								<div className="ekspedisi-right">
									<span className="evalue">Rp. {ekspedisiFilter[0].price}</span>
								</div>
							</div>
							<div className="ekspedisi-result">
								<div className="ekspedisi-left">
									<span>Estimasi:</span>
								</div>
								<div className="ekspedisi-right">
									<span className="evalue">{ekspedisiFilter[0].etd}</span>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</StyledResult>
	);
};

export default Result;

Result.propTypes = {
	result: PropTypes.object.isRequired
};
