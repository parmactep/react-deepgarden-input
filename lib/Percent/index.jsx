import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export default
@withClassName('_Input')
@input('_PercentInput')
class PercentInput extends React.Component {
	static defaultProps = {
		value: 0,
	}
	handleChange = (e) => {
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
