import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import NoSsr from "@material-ui/core/NoSsr";
import { makeStyles } from "@material-ui/core/styles";
import CustomComponents from "./custom-select";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		height: 55,
		minWidth: 240
	},
	input: {
		display: "flex",
		padding: 0,
		height: "auto"
	},
	valueContainer: {
		display: "flex",
		flexWrap: "wrap",
		flex: 1,
		alignItems: "center",
		overflow: "hidden"
	},
	noOptionsMessage: {
		padding: theme.spacing(1, 2)
	},
	placeholder: {
		position: "absolute",
		left: 2,
		bottom: 6,
		fontSize: 16
	},
	paper: {
		position: "absolute",
		zIndex: 1,
		marginTop: theme.spacing(1),
		left: 0,
		right: 0
	}
}));

const Option = props => {
	const { placeHolder, form, field, isDisabled, suggestions } = props;

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<NoSsr>
				<Select
					classes={classes}
					inputId={field.name}
					placeholder={placeHolder}
					options={suggestions}
					components={CustomComponents}
					TextFieldProps={{
						disabled: isDisabled,
						InputLabelProps: {
							shrink: true
						}
					}}
					name={field.name}
					onBlur={field.onBlur}
					onChange={suggestions => form.setFieldValue(field.name, suggestions)}
					value={
						suggestions && field.value
							? suggestions.find(suggestion => suggestion.value === field.value)
							: ""
					}
					isClearable
					isDisabled={isDisabled}
				/>
			</NoSsr>
		</div>
	);
};

export default Option;

Option.propTypes = {
	placeHolder: PropTypes.string,
	suggestions: PropTypes.array,
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,
	isDisabled: PropTypes.bool
};
