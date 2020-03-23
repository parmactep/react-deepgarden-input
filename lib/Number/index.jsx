import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export default
@withClassName('_Input')
@input('_NumberInput')
class NumberInput extends React.Component {
	static defaultProps = {
		value: '',
	}
	handleChange = (e) => {
		this.props.onChange(+e.target.value);
	}
	render() {
		return <input {...this.props} min="0" onChange={this.handleChange} value={this.props.value} />;
	}
}

import './index.styl';
