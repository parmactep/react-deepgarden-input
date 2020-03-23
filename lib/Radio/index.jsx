import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export default
@withClassName('_Input')
@input('_RadioInput')
class RadioInput extends React.Component {
	static defaultProps = {
		value: false,
	};
	handleChange = (e) => {
		!!this.props.onChange && this.props.onChange(e.target.checked, e);
	};
	render() {
		return (
			<div className="_RadioInput__Input">
				<input {...this.props} type="radio" onChange={this.handleChange} checked={this.props.value} />
			</div>
		);
	}
}

import './index.styl';
