import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

interface INumberInputProps{
    onChange?:(values: number )=>void;
	max?: number;
	postfix?: string;
	value?: any;
}

class NumberInput extends React.Component <INumberInputProps> {
	static defaultProps = {
		value: '',
	}
	handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		this.props.max ? +e.target.value <= this.props.max && this.props.onChange(+e.target.value) : this.props.onChange(+e.target.value);
	}
	handleInput = (e:any) => {
		e.target.value = +e.target.value;
	}
	render() {
        return (
            <div className="_TextInput__Wrapper">
                <input
                    {...this.props}
                    min="0"
                    onInput={this.handleInput}
                    onChange={this.handleChange}
                    value={this.props.value}
                />
                {this.props.postfix
                && (
                    <div className="_TextInput__Postfix">
                        {this.props.postfix}
                    </div>
                )}
            </div>
        );
    }
}

import './index.styl';

export default withClassName('_Input')(input('_NumberInput')(NumberInput));
