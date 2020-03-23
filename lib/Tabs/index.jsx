import React from 'react';
import classNames from 'classnames';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export default
@withClassName('_Input')
@input('_TabsInput')
class TabsInput extends React.Component {
	static defaultProps = {
		value: false,
	};
	handleChange = (value) => {
		this.props.onChange(value);
	};
	renderOption = (option, key) => (
		<div
			key={key}
			className={classNames('_TabsInput__Option', { '_TabsInput__Option--isActive': this.props.value === option.value })}
			onClick={() => this.handleChange(option.value)}
		>
			{option.label}
		</div>
	);
	render() {
		return (
			<div className="_TabsInput__Input">
				{this.props.options.map(this.renderOption)}
			</div>
		);
	}
}

import './index.styl';
