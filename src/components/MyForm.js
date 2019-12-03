import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import Option from "./Option";

const useStyles = makeStyles({
	label: {
		marginBottom: 10
	},
	submitBtn: {
		marginTop: 22
	}
});

const MyForm = props => {
	const {
		courier,
		handleError,
		handleResult,
		handleLoading,
		provinces,
		cities
	} = props;
	const classes = useStyles();

	return (
		<Formik
			initialValues={{
				provOrigin: null,
				provDestination: null,
				cityOrigin: null,
				cityDestination: null,
				weight: ""
			}}
			onSubmit={({ cityOrigin, cityDestination, weight }, { resetForm }) => {
				handleError({
					error: false,
					type: ""
				});
				handleResult(null);
				handleLoading();
				resetForm({});
				axios
					.post(
						"https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/cost",
						{
							origin: cityOrigin.id,
							destination: cityDestination.id,
							courier,
							weight
						},
						{
							headers: {
								key: process.env.REACT_APP_RAJA_ONGKIR_API_KEY
							}
						}
					)
					.then(res => {
						handleLoading();
						handleResult(res.data);
					})
					.catch(err => {
						handleLoading(true);
						handleError({
							error: true,
							type: "invalid input"
						});
					});
			}}
		>
			{({ values, getFieldProps }) => {
				return (
					<Form>
						<Box>
							<Typography variant="subtitle2" className={classes.label}>
								Tempat asal
							</Typography>
							<Field name="provOrigin">
								{({ form, field }) => (
									<Option
										suggestions={provinces}
										placeHolder="Pilih asal provinsi..."
										form={form}
										field={field}
										isDisabled={provinces === null}
									/>
								)}
							</Field>
							<Field name="cityOrigin">
								{({ form, field }) => (
									<Option
										suggestions={
											values.provOrigin &&
											cities.filter(
												city => city.provinceId === values.provOrigin.id
											)
										}
										placeHolder="Pilih kota asal..."
										form={form}
										field={field}
										isDisabled={values.provOrigin === null}
									/>
								)}
							</Field>
						</Box>
						<Box>
							<Typography variant="subtitle2" className={classes.label}>
								Tempat tujuan
							</Typography>
							<Field name="provDestination">
								{({ form, field }) => (
									<Option
										suggestions={provinces}
										placeHolder="Pilih provinsi tujuan..."
										form={form}
										field={field}
										isDisabled={provinces === null}
									/>
								)}
							</Field>
							<Field name="cityDestination">
								{({ form, field }) => (
									<Option
										suggestions={
											values.provDestination &&
											cities.filter(
												city => city.provinceId === values.provDestination.id
											)
										}
										placeHolder="Pilih kota tujuan..."
										form={form}
										field={field}
										isDisabled={values.provDestination === null}
									/>
								)}
							</Field>
						</Box>

						<Typography variant="subtitle2" className={classes.label}>
							Berat barang
						</Typography>
						<TextField
							fullWidth
							type="number"
							name="weight"
							placeholder="Berat barang..."
							InputProps={{
								endAdornment: (
									<InputAdornment position="end" disablePointerEvents={true}>
										gram
									</InputAdornment>
								)
							}}
							{...getFieldProps("weight")}
						/>
						<Button
							className={classes.submitBtn}
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							disabled={
								!courier ||
								!values.provOrigin ||
								!values.provDestination ||
								!values.cityOrigin ||
								!values.cityDestination ||
								!values.weight
							}
						>
							Cek
						</Button>
					</Form>
				);
			}}
		</Formik>
	);
};

export default MyForm;

MyForm.propTypes = {
	provinces: PropTypes.array,
	cities: PropTypes.array,
	courier: PropTypes.string.isRequired,
	handleResult: PropTypes.func.isRequired,
	handleError: PropTypes.func.isRequired,
	handleLoading: PropTypes.func.isRequired
};
