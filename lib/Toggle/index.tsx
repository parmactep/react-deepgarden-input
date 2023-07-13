import React from 'react';
import classNames from 'classnames';

import { withClassName } from 'react-deepgarden';

import input from '../input';

interface IToggleInputProps {
	onChange?:(values: boolean) => void;
	value?: any;
	disabled?: boolean;
}

class ToggleInput extends React.Component<IToggleInputProps> {
	static defaultProps = {
		value: false,
	};

	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onChange(e.target.checked);
	};

	render() {
		const value = !!+this.props.value;
		return (
			<label
				className={classNames('_ToggleInput__Input', { '_ToggleInput__Input--True': value }, { '_ToggleInput__Input--isDisabled': this.props.disabled })}
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

export default withClassName('_Input')(input('_ToggleInput')(ToggleInput));
