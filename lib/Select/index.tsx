import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

interface Ioptions{
	label: string;
	value: string;
	disabled?: boolean;
}

export interface ISelectProps extends React.FormEventHandler<HTMLInputElement>{
	onChange?: (values: string | undefined) => void;
	value?: string;
	options?: Ioptions[] | undefined;
	placeholder?: string
}

function Select({
	options = [],
	value,
	placeholder,
	onChange,
	...props
}: ISelectProps) {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const index = e.target.value ? parseInt(e.target.value, 10) : undefined;
		const selectedOption = options[index];
		const selectedValue = selectedOption ? selectedOption.value : undefined;
		onChange && onChange(selectedValue);
	};

	const renderOption = (option: Ioptions, key: React.Key) => (
		<option key={key} value={key} disabled={option.disabled}>
			{option.label}
		</option>
	);
	return (
		<select
			{...props}
			value={options.findIndex((option) => option.value === value)}
			onChange={handleChange}
		>
			{placeholder && <option value={null}>{placeholder}</option>}
			{options.map(renderOption)}
		</select>
	);
}

import './index.styl';

export default withClassName('_Input')(input('_SelectInput')(Select));
