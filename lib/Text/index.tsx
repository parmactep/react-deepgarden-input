import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export interface ITextInputProps extends React.FormEventHandler<HTMLInputElement> {
	onChange?: (values: string) => void;
	value?: string;
	postfix?: string;
	autoCapitalize?: string;
}

function TextInput({
	value = '',
	postfix,
	onChange,
	autoCapitalize = 'none',
	...rest
}: ITextInputProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange && onChange(e.target.value);
	};

	return (
		<div className="_TextInput__Wrapper">
			<input type="text" {...rest} value={value} onChange={handleChange} autoCapitalize={autoCapitalize} />
			{postfix
				&& (
					<div className="_TextInput__Postfix">
						{postfix}
					</div>
				)}
		</div>
	);
}

import './index.styl';

export default withClassName('_Input')(input('_TextInput')(TextInput));
