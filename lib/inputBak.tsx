import React from 'react';

import classNames from 'classnames';

import './input.styl';

interface IinputBak{
	[x: string]: any;
	onChange?: (value: any) => void;
	className?: string;
	style?: any;

}

export default class extends React.Component<IinputBak> {
	constructor(props:IinputBak) {
		super(props);
		this.handleChange.bind(this);
		//@TODO: Check if 'onChange' handler is set . Otherwise propose to use 'defaultValue' prop.
	}
	handleChange(value: any) {
		this.props.onChange && this.props.onChange(value);
	};
	renderInput(): any {
		return null;
	}
	render() {
		const {className, style, ...props} = this.props;
		return <div className={classNames('_Input', className)} style={style}>
			{this.renderInput()}
		</div>
	}
}