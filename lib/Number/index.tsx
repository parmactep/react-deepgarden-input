import React, { ChangeEvent } from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export interface INumberInputProps extends React.FormEventHandler<HTMLInputElement> {
    onChange?:(values: number) => void;
	max?: string | number;
	postfix?: string;
	value?: string | number;
}

function NumberInput({
	max,
	postfix,
	onChange,
	value,
	...rest
}: INumberInputProps) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		max ? +e.target.value <= max && onChange(+e.target.value) : onChange(+e.target.value);
	};

	const handleInput = (e: any) => {
		e.target.value = +e.target.value;
	};

	return (
		<div className="_TextInput__Wrapper">
			<input
				{...rest}
				min="0"
				max={max}
				onInput={handleInput}
				onChange={handleChange}
				value={value}
			/>
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

export default withClassName('_Input')(input('_NumberInput')(NumberInput));
