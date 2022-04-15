import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

interface ITextareaInputProps{
	onChange?: (values: string) => void;
	value?: string;
}

class TextareaInput extends React.Component<ITextareaInputProps> {
	static defaultProps = {
		value: '',
	}
	handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		this.props.onChange(e.target.value);
	}
	render() {
		return <textarea {...this.props} onChange={this.handleChange} value={this.props.value} />;
	}
}

import './index.styl';

export default withClassName('_Input')(input('_TextareaInput')(TextareaInput));
