import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export default
@withClassName('_Input')
@input('_SelectInput')
class Select extends React.Component {
	static defaultProps = {
		options: [],
	};
	handleChange = (e) => {
		this.props.onChange(this.props.options[e.target.value]
			? this.props.options[e.target.value].value
			: undefined); // Pick option by key to save value type
	};
	renderOption = (option, key) => {
		return <option key={key} value={key}>{option.label}</option>
	};
	render() {
		const { options, placeholder, ...props } = this.props;
		const value = options.findIndex((option) => option.value === this.props.value);

		return (
			<select
				{...props}
				value={value}
				onChange={this.handleChange}
			>
				{placeholder && <option value={null}>{placeholder}</option>}
				{options.map(this.renderOption)}
			</select>
		);
	}
}

import './index.styl';
