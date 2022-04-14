import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

interface IRadioInputProps{
    onChange?:(values: boolean )=>void;
	value?: any;

}

class RadioInput extends React.Component <IRadioInputProps> {
	static defaultProps = {
		value: false,
	};
	handleChange = (e: any) => {
		!!this.props.onChange && this.props.onChange(e.target.checked);
	};
	render() {
		return (
			<div className="_RadioInput__Input">
				<input {...this.props} type="radio" onChange={this.handleChange} checked={this.props.value} />
			</div>
		);
	}
}

import './index.styl';

export default withClassName('_Input')(input('_RadioInput')(RadioInput));
