import React from 'react';
import classNames from 'classnames';

import { withClassName } from 'react-deepgarden';

import input from '../input';

interface Ioptions {
	value: boolean;
	label: string;
}

export interface ITabsInputProps {
	onChange?:(values: boolean) => void;
	options?: Ioptions[] | undefined;
	value?: boolean;
}

function TabsInput({
	options,
	value = false,
	onChange,
}: ITabsInputProps) {
	const handleChange = (newValue: boolean) => {
		onChange && onChange(newValue);
	};

	const renderOption = (option: Ioptions, key: number) => (
		<div
			key={key}
			className={classNames('_TabsInput__Option', { '_TabsInput__Option--isActive': value === option.value })}
			onClick={() => handleChange(option.value)}
		>
			{option.label}
		</div>
	);

	return (
		<div className="_TabsInput__Input">
			{options.map(renderOption)}
		</div>
	);
}

import './index.styl';

export default withClassName('_Input')(input('_TabsInput')(TabsInput));
