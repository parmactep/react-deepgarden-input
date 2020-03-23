import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export default
@withClassName('_Input')
@input('_ImageUploadInput')
class ImageUpload extends React.Component {
	static defaultProps = {
		value: '',
	};
	state = {
		pending: false,
	};
	handleImageSelect = async (e) => { // @TODO: Handle errors
		const file = e.target.files[0];
		if (!!this.props.onUpload) { // @TODO: implement default upload function
			const value = await this.props.onUpload(file);
			return this.props.onChange(value);
		}
	};
	handleChange = (e) => {
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
				<input type="file" ref={(node) => this._input = node} accept="image/*" onChange={this.handleImageSelect} className="_ImageUploadInput__Input" />
			</div>
		);
	}
}

import './index.styl';
