import React from 'react';
import classNames from 'classnames';

import { withClassName } from 'react-deepgarden';

import input from '../input';

interface Ioptions{
	value?: boolean;
	label?: string;
}

interface ITabsInputProps{
	onChange?:(values: boolean) => void;
	options?: Ioptions[] | undefined;
	value?: boolean;
}

class TabsInput extends React.Component <ITabsInputProps> {
	static defaultProps = {
		value: false,
	};
	handleChange = (value: boolean) => {
		this.props.onChange(value);
	};
	renderOption = (option: Ioptions, key: React.Key) => (
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

export default withClassName('_Input')(input('_TabsInput')(TabsInput));
