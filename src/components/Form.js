import React, {useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import axios from "axios";
import * as yup from "yup";
import CustomErrorMessage from "./CustomErrorMessage";
import CustomSelect from "./CustomSelect";
import CustomRadio from "./CustomRadio";
import jne from "../assets/jne.png";
import pos from "../assets/pos.png";
import tiki from "../assets/tiki.png";

const StyledForm = styled.div`
	background: #FFFDFD;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
	border-radius: 20px;
	padding: 1.5rem 2rem;

	.input-label {
		font-weight: 600;
		margin-bottom: 1rem;
		color: #444;
		font-size: 1.2rem;
		display: block;
	}

	.row:not(:first-child) {
		margin-top: 1.1rem;
	}

	.radio-group {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	
	.radio-group label:not(:nth-child(3)) {
		margin-right: 20px;
	}

	.select-input:first-child, .select-input:nth-child(3) {
		margin-bottom: 14px;
	}
	
	.input-wrapper {
		overflow: hidden;
		border-radius: 5px;
		background: #F1EEEE;
		position: relative;
		padding: 10px;
		font-size: 14px; 
		color: #555;
		padding: 20px;
	}

	.weight-input {
		padding: 5px 10px;
		background: transparent;
		border: none;
		position: absolute;
		width: 85%;
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
		right: 1rem;
	}

	.submit-btn {
		margin-top: 1.5rem;
		width: 100%
		padding: 10px;
		font-size: .9rem;
		background: #DE6B95;
		border-radius: 5px;
		color: #F1EEEE;
		font-weight: 600;
		border: none;
		cursor: pointer;
		outline: none;
		transition: background .3s ease;
	}

	.submit-btn:hover, .submit-btn:focus {
		background: #C85880;
	}

	.submit-btn:disabled {
		opacity: .7;
		cursor: default;
	}
`;

const getData = url => {
  return axios.get(`https://cors-anywhere.herokuapp.com/${url}`, {
    headers: {
      key: process.env.REACT_APP_RAJA_ONGKIR_API_KEY
    }
  });
};

const MyForm = ({ handleResult }) => {
	const provinces = JSON.parse(localStorage.getItem("provinces"));
	let cities = JSON.parse(localStorage.getItem("cities"));

	useEffect(() => {
		if (!cities) {
			const getProvinces = getData(
				"https://api.rajaongkir.com/starter/province"
			);
			const getCities = getData("https://api.rajaongkir.com/starter/city");

			axios
				.all([getProvinces, getCities])
				.then(
					axios.spread((resProv, resCities) => {
						let finalCities = [];
						resProv.data.rajaongkir.results.forEach(province => {
							const filterCities = resCities.data.rajaongkir.results
								.filter(city => city.province_id === province.province_id)
								.map(city => ({
									id: city.city_id,
									value: `${city.city_name}, ${province.province}`,
									label: `${city.city_name}, ${province.province}`
								}));
							finalCities = [...finalCities, ...filterCities];
						});
						cities = finalCities;
						localStorage.setItem("cities", JSON.stringify(cities));
					})
				)
				.catch(
					err => console.log(err)
					//   // handleError({
					//   //   error: true,
					//   //   type: "network error"
					//   // })
				);
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
				console.log(actions);
				const { service, cityOrigin, cityDestination, weight } = values;
				actions.setSubmitting(true);
				// handleError({
				// 	error: false,
				// 	type: ""
				// });
				// handleResult(null);
				// handleLoading();
				// resetForm({});
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
						console.log(res.data);
						actions.setSubmitting(false);
						handleResult(res.data.rajaongkir);
					});
				// .catch(err => {
				// 	// handleLoading(true);
				// 	// handleError({
				// 	// 	error: true,
				// 	// 	type: "invalid input"
				// 	// });
				// });
			}}
		>
			{formik => {
				return (
					<StyledForm>
						<Form>
							<div className="row">
								<label className="input-label">Service</label>
								<div className="radio-group">
									<CustomRadio id="jne" name="service" value="jne">
										<img src={jne} alt="jne" />
									</CustomRadio>
									<CustomRadio id="pos" name="service" value="pos">
										<img src={pos} alt="pos" />
									</CustomRadio>
									<CustomRadio id="tiki" name="service" value="tiki">
										<img src={tiki} alt="tiki" />
									</CustomRadio>
								</div>
								<ErrorMessage component={CustomErrorMessage} name="service" />
							</div>

							<div className="row">
								<label className="input-label" htmlFor="cityOrigin">
									Tempat asal
								</label>
								<div className="select-group">
									<Field name="cityOrigin">
										{({ form, field }) => (
											<CustomSelect
												className="select-input"
												placeholder="Kota asal"
												form={form}
												field={field}
												options={cities}
												isDisabled={!cities}
											/>
										)}
									</Field>
								</div>
								<ErrorMessage
									component={CustomErrorMessage}
									name="cityOrigin"
								/>
							</div>

							<div className="row">
								<label className="input-label" htmlFor="cityDestination">
									Tempat tujuan
								</label>
								<div className="select-group">
									<Field name="cityDestination">
										{({ form, field }) => (
											<CustomSelect
												className="select-input"
												placeholder="Kota tujuan"
												form={form}
												field={field}
												options={cities}
												isDisabled={!cities}
											/>
										)}
									</Field>
								</div>
								<ErrorMessage
									component={CustomErrorMessage}
									name="cityDestination"
								/>
							</div>

							<div className="row">
								<label className="input-label" htmlFor="weight">
									Berat barang
								</label>
								<div className="input-wrapper">
									<Field
										id="weight"
										name="weight"
										type="number"
										className="weight-input"
										placeholder="Berat barang"
									/>
									<div>gr</div>
								</div>
								<ErrorMessage component={CustomErrorMessage} name="weight" />
							</div>

							<button
								type="submit"
								className="submit-btn"
								disabled={formik.isSubmitting}
							>
								{formik.isSubmitting ? "Mengecek..." : "CEK"}
							</button>
						</Form>
					</StyledForm>
				);
			}}
		</Formik>
	);
};

export default MyForm;
