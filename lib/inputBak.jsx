import React from 'react';

import classNames from 'classnames';

import './input.styl';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange.bind(this);
		//@TODO: Check if 'onChange' handler is set . Otherwise propose to use 'defaultValue' prop.
	}
	handleChange(value) {
		this.props.onChange && this.props.onChange(value);
	};
	renderInput() {
		return null;
	}
	render() {
		const {className, style, ...props} = this.props;
		return <div className={classNames('_Input', className)} style={style}>
			{this.renderInput()}
		</div>
	}
}