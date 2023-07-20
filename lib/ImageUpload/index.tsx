import React, { useRef } from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

interface IImageUploadProps {
	onChange?: (file: string) => void;
	onUpload?: (file: globalThis.File) => any;
	placeholder?: string;
	placeholderText?: string;
	value?: string;
}

function ImageUpload({
	onChange,
	onUpload,
	placeholder,
	placeholderText,
	value,
}: IImageUploadProps) {
	const _input = useRef();

	const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => { // @TODO: Handle errors
		const file = e.target.files[0];
		if (!!onUpload) { // @TODO: implement default upload function
			const newValue = await onUpload(file);
			return onChange(newValue);
		}
	};

	return (
		<div className="_ImageUploadInput__Image">
			{value
				? <img src={value} alt={value} />
				: placeholder
					? <img src={placeholder} alt="No Image" />
					: (
						<div className="_ImageUploadInput__NoImage">
							No image
						</div>
					)}
			{!!placeholderText && (
				<div
					className="_ImageUploadInput__PlaceholderText"
					style={!value ? { display: 'flex' } : {}}
				>
					{placeholderText}
				</div>
			)}
			<input
				type="file"
				ref={_input}
				accept="image/*"
				onChange={handleImageSelect}
				className="_ImageUploadInput__Input"
			/>
		</div>
	);
}

import './index.styl';

export default withClassName('_Input')(input('_ImageUploadInput')(ImageUpload));
