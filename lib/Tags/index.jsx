import React from 'react';

import Input from '../input';

export default class extends Input {
	static defaultProps = {
		options: [],
	};
	handleChange = (e) => {
		super.handleChange(e.target.value);
	};
	renderOption = (option, key) => {
		return <option key={key} value={option.value}>{option.label}</option>;
	};
	renderInput() {
		const { className, options, ...props } = this.props;
		return (
			<div className={`_Input__Input --Select ${className}`}>
				<select {...props} onChange={this.handleChange}>
					{options.map(this.renderOption)}
				</select>
			</div>
		);
	}
}
