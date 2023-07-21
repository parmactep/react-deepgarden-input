import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

interface INumberInputProps {
	onChange?:(value: number) => void;
	max?: number;
	postfix?: string;
	value?: any;
}

function NumberInput({
	onChange = (_) => {},
	max,
	postfix,
	value = '',
	...props
}: INumberInputProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(
			(max && +e.target.value >= max)
				? max
				: +e.target.value,
		);
	};

	return (
		<div className="_TextInput__Wrapper">
			<input
				{...props}
				min="0"
				onChange={handleChange}
				value={value}
			/>
			{postfix && (
				<div className="_TextInput__Postfix">
					{postfix}
				</div>
			)}
		</div>
	);
}

import './index.styl';

export default withClassName('_Input')(input('_NumberInput')(NumberInput));
