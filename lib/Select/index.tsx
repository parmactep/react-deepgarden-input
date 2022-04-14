import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

interface Ioptions{
	label?: string;
	value?: string;
}

interface ISelectProps{
    onChange?:(values: string|undefined )=>void;
	value?: any;
	options?:Ioptions[] | undefined;
	placeholder?: string

}

class Select extends React.Component <ISelectProps> {
	static defaultProps: ISelectProps = {
		options: [],
	};
	handleChange = (e: any) => {
		this.props.onChange(this.props.options[e.target.value]
			? this.props.options[e.target.value].value
			: undefined); // Pick option by key to save value type
	};
	renderOption = (option:Ioptions, key: React.Key) => {
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

export default withClassName('_Input')(input('_SelectInput')(Select));
