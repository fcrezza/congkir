import axios from "axios";

const getData = async url => {
	try {
		const fetchData = await axios.get(
			`https://cors-anywhere.herokuapp.com/${url}`,
			{
				headers: {
					key: process.env.REACT_APP_RAJA_ONGKIR_API_KEY
				}
			}
		);
		const res = await fetchData.data.rajaongkir.results;
		return res;
	} catch (err) {
		return err;
	}
};

const getProvinces = getData("https://api.rajaongkir.com/starter/province");
const getCities = getData("https://api.rajaongkir.com/starter/city");

export default () => {
	return axios.all([getProvinces, getCities]).then(res => {
		if (res[0].isAxiosError || res[0].isAxiosError) {
			return false;
		} else {
			let finalCities = [];
			res[0].forEach(province => {
				const filterCities = res[1]
					.filter(city => city.province_id === province.province_id)
					.map(city => ({
						id: city.city_id,
						value: `${city.city_name}, ${province.province}`,
						label: `${city.city_name}, ${province.province}`
					}));
				finalCities = [...finalCities, ...filterCities];
			});
			localStorage.setItem("cities", JSON.stringify(finalCities));
			return finalCities;
		}
	});
};
