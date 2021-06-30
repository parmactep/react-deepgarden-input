import React from 'react';
import classNames from 'classnames';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export default
@withClassName('_Input')
@input ('_ToggleInput')
class ToggleInput extends React.Component {
	static defaultProps = {
		value: false,
	};
	handleChange = (e) => {
		this.props.onChange(e.target.checked);
	};
	render() {
		const value = !!+this.props.value;
		return (
			<label
				className={classNames('_ToggleInput__Input', {'_ToggleInput__Input--True' : value}, {'_ToggleInput__Input--isDisabled' : this.props.disabled})}
			>
				<input
					{...this.props}
					type="checkbox"
					onChange={this.handleChange}
					checked={value}
				/>
			</label>
		);
	}
}

import './index.styl';
