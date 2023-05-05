import React from 'react';
import classNames from 'classnames';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export interface IToggleInputProps extends React.FormEventHandler<HTMLInputElement>{
	onChange?:(values: boolean) => void;
	value?: boolean;
	disabled?: boolean;
}

function ToggleInput({
	onChange,
	value = false,
	disabled = false,
	...rest
}: IToggleInputProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange && onChange(e.target.checked);
	};
	const checked = !!+value;
	return (
		<label
			className={classNames('_ToggleInput__Input', { '_ToggleInput__Input--True': checked }, { '_ToggleInput__Input--isDisabled': disabled })}
		>
			<input
				{...rest}
				type="checkbox"
				onChange={handleChange}
				checked={value}
				disabled={disabled}
			/>
		</label>
	);
}

import './index.styl';

export default withClassName('_Input')(input('_ToggleInput')(ToggleInput));
