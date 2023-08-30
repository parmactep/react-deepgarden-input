import React, { forwardRef, ForwardedRef } from 'react';
import { View, Text } from 'react-native';
import { get } from 'lodash';

import Context from './Context';

import { IInputComponentProps } from '../lib/input';
import Input from "../lib";

import styles from './index.native.styl';

interface IFieldProps extends IInputComponentProps {
	label?: string;
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
					<View style={styles.Field}>
						{label && (
							<Text style={styles.Label}>
								{label}
							</Text>
						)}
						<View>
							{_view ? (
								<View>
									{!children
										? value
										: typeof children === 'function'
											? children(value)
											: children}
								</View>
							) : (
								<InputComponent
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
							{!!legend && (
								<Text>
									{legend}
								</Text>
							)}
						</View>
						{(error || errors[name]) && (
							<View>
								{error || errors[name]}
							</View>
						)}
					</View>
				);
			}}
		</Context.Consumer>
	);
}

export default forwardRef(Field);
