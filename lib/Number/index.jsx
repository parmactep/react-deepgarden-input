import React from 'react';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export default
@withClassName('_Input')
@input('_NumberInput')
class NumberInput extends React.Component {
	static defaultProps = {
		value: '',
	}
	handleChange = (e) => {
		this.props.onChange(+e.target.value);
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
