import React from 'react';

import classNames from 'classnames';

import './index.styl';

interface IImageInputProps{
	onChange?:(file: globalThis.File | string) => void;
	value?: string;
	className?: string;
}

export default class ImageInput extends React.Component<IImageInputProps> {
	static className = '_ImageInput';
	static defaultProps = {
		value: '',
	};
	handleImageSelect = (e:React.ChangeEvent<HTMLInputElement>) => {
		this.props.onChange && this.props.onChange(e.target.files[0]);
	};
	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onChange && this.props.onChange(e.target.value);
	};
	render() {
		const { className, ...props } = this.props;
		return (
			<div className={classNames('_Input', '_ImageInput', className)}>
				{!!this.props.value
				&& <img className="_ImageInput__Image" src={this.props.value} />}
				<input {...props} type="file" onChange={this.handleChange} value={this.props.value} />
			</div>
		);
	}
}
