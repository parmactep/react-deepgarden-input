import React from 'react';
import classNames from 'classnames';
import { get } from 'lodash';

import Context from './Context';

import Input from '../index';

import { IInputComponentProps } from '../lib/input'

interface IFieldProps extends IInputComponentProps {
	label?: string;
	name?: string;
	_inline?: boolean;
	_view?: boolean;
	className?: string;
	validate?: (value: any) => Promise<string>;
	error?: string;
	children?: React.ReactNode;
	onBlur?: (e: React.SyntheticEvent) => void;
	onChange?: (value: any) => void;
	component?: React.ComponentType;
}

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
	component,
	...props
}: IFieldProps, ref) => (
	<Context.Consumer>
		{({
			values,
			handleChange,
			errors,
			handleError,
		}) => {
			const value = get(values, name);
			const InputComponent = component || Input;
			return (
				<div className={classNames('_Form__Field', { '_Form__Field--Inline': _inline }, className)}>
					{label && (
						<div className="_Form__Label">
							{label}
						</div>
					)}
					{_view ? (
						<div className="_Form__View">
							{!children
								? value
								: typeof children === 'function'
									? children(value)
									: children}
						</div>
					) : (
						<InputComponent
							className="_Form__Input"
							{...props}
							{...(name && (value !== undefined)) && { ...{ name, value } }}
							onBlur={(e: any) => {
								onBlur && onBlur(e);
								validate && validate(value)
									.then((validationError: any) => Object.keys(validationError || {}).length && handleError({ [name]: validationError }))
									.catch((validationError: any) => handleError({ [name]: validationError }));
							}}
							onChange={(newValue: any) => {
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
