import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

interface IPercentInputProps {
	onChange?:(values: number) => void;
	max?: number;
	postfix?: string;
	value?: number;
}

class PercentInput extends React.Component<IPercentInputProps> {
	static defaultProps = {
		value: 0,
	};

	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		if (isNaN(value)) return;
		this.props.onChange(value / 100);
	};

	render() {
		return (
			<div className="_PercentInput__Input">
				<input {...this.props} onChange={this.handleChange} value={(this.props.value * 100)} />
				<div className="_PercentInput__Ico">
					%
				</div>
			</div>
		);
	}
}

import './index.styl';

export default withClassName('_Input')(input('_PercentInput')(PercentInput));
