import React, { ChangeEvent } from 'react';
import classNames from 'classnames';

import { withClassName } from 'react-deepgarden';

import input from '../input';

interface ICheckboxInputProps {
	onChange: (e: boolean) => void;
	disabled?: boolean;
	value?: boolean;
}

function CheckboxInput({
	onChange,
	disabled = false,
	value = false,
}: ICheckboxInputProps) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange && onChange(e.target.checked);
	};
	const formattedValue = !!+value;
	return (
		<div className={classNames('_CheckboxInput__Input', { '_CheckboxInput__Input--Checked': formattedValue }, { '_CheckboxInput--Disabled': disabled })}>
			{formattedValue && (
				<svg stroke="currentColor" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
					<path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
				</svg>
			)}
			<input type="checkbox" disabled={disabled} onChange={handleChange} checked={formattedValue} />
		</div>
	);
}

import './index.styl';

export default withClassName('_Input')(input('_CheckboxInput', 'label')(CheckboxInput));
