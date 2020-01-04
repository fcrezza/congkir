import React, { useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const customStyles = {
	control: (provided, state) => {
		const backgroundColor = state.isDisabled ? "#f6f6f6" : "#F1EEEE";

		return {
			...provided,
			backgroundColor,
			boxShadow: "none",
			border: "none"
		};
	},
	placeholder: (provided, state) => {
		const color = state.isDisabled ? "#aaa" : "#555";
		return {
			...provided,
			fontSize: 12,
			fontFamily: "Montserrat, sans-serif",
			fontWeight: 400,
			color
		};
	}
};

const CustomSelect = props => {
	const [inputValue, setInputValue] = useState("");
	const { form, field, options } = props;

	const handleInputChange = text => setInputValue(text.trim());
	const handleChange = option => form.setFieldValue(field.name, option);
	const suggestions = options && options.filter(city => {
		return city.value.slice(0, inputValue.length).toLowerCase() === inputValue;
	});
	const value =
		options && field.value
			? options.find(options => options.value === field.value.value)
			: null;

	return (
		<Select
			inputId={field.name}
			styles={customStyles}
			isClearable
			isSearchable
			menuIsOpen={inputValue.length > 0}
			onInputChange={handleInputChange}
			{...field}
			onChange={handleChange}
			value={value}
			{...props}
			options={suggestions}
		/>
	);
};

export default CustomSelect;

CustomSelect.propTypes = {
	className: PropTypes.string,
	placeholder: PropTypes.string,
	form: PropTypes.object,
	field: PropTypes.object,
	options: PropTypes.array.isRequired,
	isDisabled: PropTypes.bool
};
