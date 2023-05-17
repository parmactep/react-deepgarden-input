import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export interface ITextareaInputProps extends React.FormEventHandler<HTMLInputElement>{
	onChange?: (values: string) => void;
	value?: string;
}

function TextareaInput({ value = '', onChange, ...rest } : ITextareaInputProps) {
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange && onChange(e.target.value);
	};

	return (
		<textarea
			{...rest}
			value={value}
			onChange={handleChange}
		/>
	);
}

import './index.styl';

export default withClassName('_Input')(input('_TextareaInput')(TextareaInput));
