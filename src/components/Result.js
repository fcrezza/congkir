import React from "react";
import {
	Box,
	Divider,
	Typography,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles({
	result: {
		marginTop: 25
	},
	resultContent: {
		marginTop: 20
	},
	tableWrapper: {
		overflowX: "auto"
	}
});

const Result = ({ result }) => {
	const classes = useStyles();

	return (
		<Box className={classes.result}>
			<Typography variant="h6">Hasil</Typography>
			<Divider />
			<Box className={classes.resultContent}>
				<Typography variant="subtitle1">
					<strong>Kurir:</strong> {result.rajaongkir.results[0].name}
				</Typography>
				<Typography variant="subtitle1">
					<strong>Dari:</strong>{" "}
					{`${result.rajaongkir.origin_details.city_name}, ${result.rajaongkir.origin_details.province}`}
				</Typography>
				<Typography variant="subtitle1">
					<strong>Tujuan:</strong>{" "}
					{`${result.rajaongkir.destination_details.city_name}, ${result.rajaongkir.destination_details.province}`}
				</Typography>
				<Typography variant="subtitle1">
					<strong>Berat barang:</strong>{" "}
					{`${result.rajaongkir.query.weight} gram (${result.rajaongkir.query
						.weight / 1000} kg)`}
				</Typography>
				<Typography variant="subtitle1">
					<strong>Jenis ekspedisi:</strong>
				</Typography>
				<Box className={classes.tableWrapper}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>Service</TableCell>
								<TableCell>Deskripsi</TableCell>
								<TableCell>Estimasi</TableCell>
								<TableCell>Harga</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{result.rajaongkir.results[0].costs.map(row => (
								<TableRow key={row.service}>
									<TableCell>{row.service}</TableCell>
									<TableCell>{row.description}</TableCell>
									<TableCell>{`${row.cost[0].etd}`}</TableCell>
									<TableCell>{`${row.cost[0].value}`}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			</Box>
		</Box>
	);
};

export default Result;

Result.propTypes = {
	result: PropTypes.object.isRequired
}