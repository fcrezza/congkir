import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";
import axios from "axios";
import * as yup from "yup";
import PropTypes from "prop-types";
import CustomErrorMessage from "./CustomErrorMessage";
import CustomSelect from "./CustomSelect";
import CustomRadio from "./CustomRadio";
import jne from "../assets/jne.png";
import pos from "../assets/pos.png";
import tiki from "../assets/tiki.png";
import getOptions from "../helpers/getOptions";

const StyledForm = styled.div`
	background: #fffdfd;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
	border-radius: 20px;
	padding: 1.5rem 2rem;

	@media screen and (max-width: 768px) {
		box-shadow: none;
		border-radius: 0;
	}

	.row:not(:first-child) {
		margin-top: 0.5rem;
	}

	.input-label {
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: #444;
		font-size: 1.1rem;
		display: block;
	}

	.radio-group {
		width: 100%;
		display: flex;
		justify-content: space-between;

		@media screen and (max-width: 1024px) {
			justify-content: flex-start;
		}
	}

	.input-wrapper {
		overflow: hidden;
		border-radius: 5px;
		background: #f1eeee;
		position: relative;
		font-size: 14px;
		color: #555;
		padding: 20px;
	}

	.weight-input {
		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		-moz-appearance: textfield;
		padding: 5px 10px;
		background: transparent;
		border: none;
		position: absolute;
		width: 90%;
		top: 0;
		color: #555;
		right: 0;
		bottom: 0;
		left: 0;
		outline: none;
	}

	.input-wrapper div {
		display: inline-block;
		position: absolute;
		top: 10px;
		width: 5%;
		right: 1rem;
		pointer-events: none;
	}

	.submit-btn {
		margin-top: 0.8rem;
		width: 100%;
		padding: 10px;
		font-size: 0.9rem;
		background: #de6b95;
		border-radius: 5px;
		color: #f1eeee;
		font-weight: 600;
		border: none;
		cursor: pointer;
		outline: none;
		transition: background 0.3s ease;
	}

	.submit-btn:hover,
	.submit-btn:focus {
		background: #c85880;
	}

	.submit-btn:disabled {
		opacity: 0.7;
		cursor: default;
	}
`;
const serviceoptions = [
	{ id: 1, name: "jne", img: jne },
	{ id: 2, name: "pos", img: pos },
	{ id: 3, name: "tiki", img: tiki }
];

const MyForm = props => {
	const { handleResult, handleToggle, handleError } = props;
	const [cities, setCities] = useState(
		JSON.parse(localStorage.getItem("cities"))
	);
	const originInput = useRef();
	const destinationInput = useRef();
	const weightInput = useRef();

	useEffect(() => {
		if (!cities) {
			const getCities = getOptions();
			getCities.then(data => {
				if (data) {
					setCities(data);
				} else {
					handleToggle(true);
					handleError(true);
				}
			});
		}
	}, []);

	return (
		<Formik
			initialValues={{
				service: "",
				cityOrigin: null,
				cityDestination: null,
				weight: ""
			}}
			validationSchema={yup.object({
				service: yup.string().required("Pilih salah satu service!"),
				cityOrigin: yup
					.object()
					.nullable()
					.required("Tempat asal tidak boleh kosong!"),
				cityDestination: yup
					.object()
					.nullable()
					.required("Tempat tujuan tidak boleh kosong!"),
				weight: yup
					.number()
					.required("Field tidak boleh kosong!")
					.positive("Berat memakai angka positif!")
					.integer("Berat harus angka integer!")
			})}
			onSubmit={(values, actions) => {
				const { service, cityOrigin, cityDestination, weight } = values;
				actions.setSubmitting(true);
				originInput.current.blur();
				destinationInput.current.blur();
				weightInput.current.blur();
				axios
					.post(
						"https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/cost",
						{
							origin: cityOrigin.id,
							destination: cityDestination.id,
							courier: service,
							weight
						},
						{
							headers: {
								key: process.env.REACT_APP_RAJA_ONGKIR_API_KEY
							}
						}
					)
					.then(res => {
						actions.setSubmitting(false);
						actions.resetForm();
						handleResult(res.data.rajaongkir);
						handleToggle(true);
					})
					.catch(() => {
						actions.setSubmitting(false);
						handleToggle(true);
						handleError(true);
					});
			}}
		>
			{({ isSubmitting }) => {
				return (
					<StyledForm>
						<Form>
							<div className="row">
								<label className="input-label">Service</label>
								<div className="radio-group">
									{serviceoptions.map(service => {
										return (
											<CustomRadio
												key={service.id}
												id={service.name}
												value={service.name}
												name="service"
											>
												<img src={service.img} alt="service.name" />
											</CustomRadio>
										);
									})}
								</div>
								<CustomErrorMessage name="service" />
							</div>

							<div className="row">
								<label className="input-label" htmlFor="cityOrigin">
									Tempat asal
								</label>
								<Field name="cityOrigin">
									{({ form, field }) => (
										<CustomSelect
											className="select-input"
											placeholder="Kota asal"
											innerRef={originInput}
											form={form}
											field={field}
											options={cities}
											isDisabled={!cities}
										/>
									)}
								</Field>
								<CustomErrorMessage name="cityOrigin" />
							</div>

							<div className="row">
								<label className="input-label" htmlFor="cityDestination">
									Tempat tujuan
								</label>
								<Field name="cityDestination">
									{({ form, field }) => (
										<CustomSelect
											className="select-input"
											placeholder="Kota tujuan"
											form={form}
											innerRef={destinationInput}
											field={field}
											options={cities}
											isDisabled={!cities}
										/>
									)}
								</Field>
								<CustomErrorMessage name="cityDestination" />
							</div>

							<div className="row">
								<label className="input-label" htmlFor="weight">
									Berat barang
								</label>
								<div className="input-wrapper">
									<Field
										id="weight"
										name="weight"
										innerRef={weightInput}
										type="number"
										className="weight-input"
										placeholder="Berat barang"
									/>
									<div>gr</div>
								</div>
								<CustomErrorMessage name="weight" />
							</div>

							<button
								type="submit"
								className="submit-btn"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Mengecek..." : "CEK"}
							</button>
						</Form>
					</StyledForm>
				);
			}}
		</Formik>
	);
};

export default MyForm;

MyForm.propTypes = {
	handleResult: PropTypes.func,
	handleToggle: PropTypes.func,
	handleError: PropTypes.func
};
