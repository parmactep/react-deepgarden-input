import React from 'react';

import classNames from 'classnames';

import './index.styl';

export default class ImageInput extends React.Component {
	static className = '_ImageInput';
	static defaultProps = {
		value: '',
	};
	handleImageSelect = (e) => {
		this.props.onChange && this.props.onChange(e.target.files[0]);
	};
	handleChange = (e) => {
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
