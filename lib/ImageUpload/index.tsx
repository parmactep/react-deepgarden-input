import React, {  useState } from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export interface IImageUploadProps {
	onChange?:(value: string) => void;
	onUpload?:(file: globalThis.File) => Promise<any>;
	placeholder?: string;
	placeholderText?: string;
	value?: string;
}

function ImageUpload({
	onChange,
	onUpload,
	placeholder,
	placeholderText,
	value = '',
}: IImageUploadProps) {
	const [pending, setPending] = useState(false);

	const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files[0];
		if (!!onUpload) {
			setPending(true);
			const fileValue = await onUpload(file);
			setPending(false);
			onChange(fileValue);
		}
	};

	return (
		<div className="_ImageUploadInput__Image">
			{!pending && value
				&& <img src={value} alt={value} />
				|| <img src={placeholder} alt="No Image" />
				|| (
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
				accept="image/*"
				onChange={handleImageSelect}
				className="_ImageUploadInput__Input"
			/>
		</div>
	);
}

import './index.styl';

export default withClassName('_Input')(input('_ImageUploadInput')(ImageUpload));
