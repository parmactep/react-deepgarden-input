import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export default
@withClassName('_Input')
@input('_TextareaInput')
class TextareaInput extends React.Component {
	static defaultProps = {
		value: '',
	}
	handleChange = (e) => {
		this.props.onChange(e.target.value);
	}
	render() {
		return <textarea {...this.props} onChange={this.handleChange} value={this.props.value} />;
	}
}

import './index.styl';
