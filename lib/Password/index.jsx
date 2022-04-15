import React from 'react';
import classNames from 'classnames';

import { withClassName } from 'react-deepgarden';

import input from '../input';

export default
@withClassName('_Input')
@input('_PasswordInput')
class PasswordInput extends React.Component {
    _input = React.createRef();
    changeAttribute = () => {
    	const inputElement = this._input.current;
    	if (inputElement.getAttribute('type') === 'password') {
    		inputElement.setAttribute('type', 'text');
    	} else {
    		inputElement.setAttribute('type', 'password');
    	}
    }
	handleChange = (e) => {
		this.props.onChange(e.target.value);
	};
	render() {
		return (
			<div className={classNames('_PasswordInput__Input', { '_PasswordInput--Disabled': this.props.disabled })}>
				<input ref={this._input} type="password" {...this.props} onChange={this.handleChange} />
				<span className="_PasswordInput__Input--Eye" onClick={() => this.changeAttribute()}>
					<svg className="bi bi-eye" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z" />
						<path fillRule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
					</svg>
				</span>
			</div>
		);
	}
}

import './index.styl';
