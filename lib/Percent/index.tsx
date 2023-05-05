import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export interface IPercentInputProps extends React.FormEventHandler<HTMLInputElement> {
	onChange?:(values: number) => void;
	max?: number;
	postfix?: string;
	value?: number;
}

function PercentInput({
	onChange,
	value = 0,
	...rest
}: IPercentInputProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const changeValue = Number(e.target.value);
		if (Number.isNaN(changeValue)) return;
		onChange && onChange(changeValue / 100);
	};

	return (
		<div className="_PercentInput__Input">
			<input {...rest} onChange={handleChange} value={(value * 100)} />
			<div className="_PercentInput__Ico">
				%
			</div>
		</div>
	);
}

import './index.styl';

export default withClassName('_Input')(input('_PercentInput')(PercentInput));
