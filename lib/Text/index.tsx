import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

interface ITextInputProps{
	onChange?: (values: string) => void;
	value?: string;
	postfix?: string
}

class TextInput extends React.Component<ITextInputProps> {
	static defaultProps = {
		value: '',
		autoCapitalize: 'none',
	};
	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onChange(e.target.value);
	};
	render() {
		const { postfix, ...props } = this.props;
		return (
			<div className="_TextInput__Wrapper">
				<input type="text" {...props} onChange={this.handleChange} value={this.props.value} />
				{postfix
				&& (
					<div className="_TextInput__Postfix">
						{postfix}
					</div>
				)}
			</div>
		);
	}
}

import './index.styl';

export default withClassName('_Input')(input('_TextInput')(TextInput));
