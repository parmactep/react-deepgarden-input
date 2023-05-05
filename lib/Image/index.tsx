import React, { ChangeEvent } from 'react';

import classNames from 'classnames';

import './index.styl';

export interface IImageInputProps {
	onChange?:(file: globalThis.File | string) => void;
	value?: string;
	className?: string;
}

export default function ImageInput({
	value = '',
	className,
	onChange,
}: IImageInputProps) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange && onChange(e.target.value);
	};

	return (
		<div className={classNames('_Input', '_ImageInput', className)}>
			{value && <img alt="" className="_ImageInput__Image" src={value} />}
			<input type="file" onChange={handleChange} value={value} />
		</div>
	);
}
