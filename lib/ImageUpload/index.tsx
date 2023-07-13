import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

interface IImageUploadProps {
	onChange?:(file: string) => void;
	onUpload?:(file: globalThis.File) => any;
	placeholder?: string;
	placeholderText?: string;
	value?: string;
}

class ImageUpload extends React.Component<IImageUploadProps> {
	_input: HTMLInputElement;

	static defaultProps = {
		value: '',
	};

	state = {
		pending: false,
	};

	handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => { // @TODO: Handle errors
		const file = e.target.files[0];
		if (!!this.props.onUpload) { // @TODO: implement default upload function
			const value = await this.props.onUpload(file);
			return this.props.onChange(value);
		}
	};

	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onChange(e.target.value);
	};

	render() {
		return (
			<div className="_ImageUploadInput__Image">
				{this.props.value
				&& <img src={this.props.value} alt={this.props.value} />
				|| <img src={this.props.placeholder} alt="No Image" />
				|| (
					<div className="_ImageUploadInput__NoImage">
						No image
					</div>
				)}
				{!!this.props.placeholderText && (
					<div
						className="_ImageUploadInput__PlaceholderText"
						style={!this.props.value ? { display: 'flex' } : {}}
					>
						{this.props.placeholderText}
					</div>
				)}
				<input type="file" ref={(node) => this._input = node} accept="image/*" onChange={this.handleImageSelect} className="_ImageUploadInput__Input" />
			</div>
		);
	}
}

import './index.styl';

export default withClassName('_Input')(input('_ImageUploadInput')(ImageUpload));
