import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export interface IRadioInputProps extends React.FormEventHandler<HTMLInputElement> {
	onChange?: (values: boolean) => void;
	value?: boolean;
}

function RadioInput({
	onChange,
	value = false,
	...rest
}: IRadioInputProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange && onChange(e.target.checked);
	};

	return (
		<div className="_RadioInput__Input">
			<input {...rest} type="radio" onChange={handleChange} checked={value} />
		</div>
	);
}

import './index.styl';

export default withClassName('_Input')(input('_RadioInput')(RadioInput));
