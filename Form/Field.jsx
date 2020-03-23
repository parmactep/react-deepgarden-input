import React from 'react';
import classNames from 'classnames';
import { get } from 'lodash';

import Context from './Context';

import Input from '../index';

const Field = React.forwardRef(({
	label,
	name,
	_inline,
	_view,
	className,
	validate,
	error,
	children,
	onBlur,
	onChange,
	...props
}, ref) => (
	<Context.Consumer>
		{({
			values,
			handleChange,
			errors,
			handleError,
		}) => {
			const value = get(values, name);
			return (
				<div className={classNames('_Form__Field', { '_Form__Field--Inline': _inline }, className)}>
					{label && (
						<div className="_Form__Label">
							{label}
						</div>
					)}
					{_view && (
						<div className="_Form__View">
							{!children
								? value
								: typeof children === 'function'
									? children(value)
									: children}
						</div>
					)
					|| (
						<Input
							className="_Form__Input"
							{...props}
							{...(name && (value !== undefined)) && { ...{ name, value } }}
							onBlur={(e) => {
								onBlur && onBlur(e);
								validate && validate(value)
									.then((validationError) => Object.keys(validationError || {}).length && handleError({ [name]: validationError }))
									.catch((validationError) => handleError({ [name]: validationError }));
							}}
							onChange={(newValue) => {
								onChange && onChange(newValue);
								name && handleChange(name, newValue);
							}}
							ref={ref}
						/>
					)}
					{(error || errors[name]) && (
						<div className="_Form__Error">
							{error || errors[name]}
						</div>
					)}
				</div>
			);
		}}
	</Context.Consumer>
));

export default Field;
