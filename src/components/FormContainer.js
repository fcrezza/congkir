import React, { useState, useEffect } from "react";
import MyForm from "./MyForm";
import axios from "axios";
import PropTypes from "prop-types";

const getData = url => {
	return axios.get(`https://cors-anywhere.herokuapp.com/${url}`, {
		headers: {
			key: process.env.REACT_APP_RAJA_ONGKIR_API_KEY
		}
	});
};

const FormContainer = ({ handleError, ...props }) => {
	const [provinces, setProvinces] = useState(
		JSON.parse(localStorage.getItem("provinces"))
	);

	const [cities, setCities] = useState(
		JSON.parse(localStorage.getItem("cities"))
	);

	useEffect(() => {
		const getProvinces = getData("https://api.rajaongkir.com/starter/province");
		const getCities = getData("https://api.rajaongkir.com/starter/city");
		if (!provinces && !cities) {
			axios
				.all([getProvinces, getCities])
				.then(
					axios.spread((acct, perms) => {
						const formatProvinces = acct.data.rajaongkir.results.map(
							province => ({
								id: province.province_id,
								value: province.province,
								label: province.province
							})
						);
						const formatCities = perms.data.rajaongkir.results.map(city => ({
							provinceId: city.province_id,
							id: city.city_id,
							value: city.city_name,
							label: city.city_name
						}));
						setProvinces(formatProvinces);
						setCities(formatCities);
						localStorage.setItem("provinces", JSON.stringify(formatProvinces));
						localStorage.setItem("cities", JSON.stringify(formatCities));
					})
				)
				.catch(err =>
					handleError({
						error: true,
						type: "network error"
					})
				);
		}
	}, []);

	return (
		<MyForm
			provinces={provinces}
			cities={cities}
			handleError={handleError}
			{...props}
		/>
	);
};

export default FormContainer;

FormContainer.propTypes = {
	courier: PropTypes.string.isRequired,
	handleResult: PropTypes.func.isRequired,
	handleError: PropTypes.func.isRequired,
	handleLoading: PropTypes.func.isRequired
};
