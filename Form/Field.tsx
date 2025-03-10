import React, { useId, forwardRef, ForwardedRef, useState } from 'react';
import classNames from 'classnames';
import { get } from 'lodash';

import Context from './Context';

import Input from '../lib';

import { IInputComponentProps } from '../lib/input';

interface IFieldProps extends IInputComponentProps {
	label?: string;
	floatingLabel?: boolean;
	fixedLabel?: boolean;
	name?: string;
	_inline?: boolean;
	_view?: boolean;
	className?: string;
	validate?: (value: any) => Promise<string>;
	error?: string;
	children?: React.ReactNode | ((value: any) => React.ReactNode);
	onBlur?: (e: React.SyntheticEvent) => void;
	onChange?: (value: any) => void;
	component?: React.ComponentType;
	legend?: React.ReactNode;
}

function Field({
	label,
	floatingLabel = false,
	fixedLabel = false,
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
	legend,
	...props
}: IFieldProps, ref: ForwardedRef<unknown>) {
	const [isFocused, setIsFocused] = useState(false);
	const id = useId();
	const htmlFor = `_Form__Field_${id}`;

	return (
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
					<div
						className={classNames(
							'_Form__Field',
							{ '_Form__Field--Inline': _inline },
							{ '_Form__FloatingWrapper': floatingLabel || fixedLabel },
							{ '_Form__FloatingWrapper--Active': (floatingLabel && (isFocused || !!value)) || fixedLabel },
							{ '_Form__FloatingWrapper--Focused': isFocused },
							className,
						)}
					>
						{label && (
							<label
								htmlFor={htmlFor}
								className={classNames(
									'_Form__Label',
									{ '_Form__FloatingLabel': floatingLabel || fixedLabel },
								)}
							>
								{label}
							</label>
						)}
						<div className="_Form__Wrapper">
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
									className={classNames('_Form__Input', { '_Form__Input--withoutLegend': !legend })}
									{...props}
									{...(name && (value !== undefined)) && { ...{ name, value } }}
									onFocus={() => setIsFocused(true)}
									onBlur={(e: any) => {
										setIsFocused(false);
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
									id={htmlFor}
								/>
							)}
							{!!legend && (
								<div className="_Form__Legend">
									{legend}
								</div>
							)}
						</div>
						{(error || errors[name]) && (
							<div className="_Form__Error">
								{error || errors[name]}
							</div>
						)}
					</div>
				);
			}}
		</Context.Consumer>
	);
}

export default forwardRef(Field);
