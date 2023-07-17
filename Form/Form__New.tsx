import React, { useState, forwardRef, useImperativeHandle, ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';
import { set } from 'lodash';
import classNames from 'classnames';

import Context from './Context';
export { default as Field } from './Field';
import Field from './Field';
export * from './Context';

function isArray(value: any) {
	return value && typeof value === 'object' && value.constructor === Array;
}

type IValues = Record<string | number, any>;
type IErrors = Record<string, string>;

export interface IFormProps {
	className?: string;
	initialValues?: IValues;
	errors?: IErrors;
	validationSchema?: any;
	validate?: any;
	inner?: string;
	children?: any;
	onSubmit?: ((values: IValues) => void) | ((values: IValues, domain?: string) => Promise<void>)
}

interface IFormI extends ForwardRefExoticComponent<any> {
	Field?: any;
}

const Form: IFormI = forwardRef(({
	className,
	initialValues,
	errors,
	validationSchema,
	validate,
	inner,
	children,
	onSubmit,
}: IFormProps, ref) => {
	const [values, setValues] = useState(initialValues);
	const [errorsState, setErrorsState] = useState(errors);

	const isValid = (errorsToCheck: IErrors = null) => Object
		.values(!!errorsToCheck ? errorsToCheck : errorsState)
		.every((error) => !error);

	const validateForm = () => new Promise<void>((resolve, reject) => { // @TODO: Rename to use
		if (validationSchema) {
			validationSchema
				.validate(values, {
					abortEarly: false,
				})
				.then(() => resolve());
		}
		const newErrorsState = {
			...errors,
			...validate(values),
		};
		setErrorsState(newErrorsState);
		isValid(newErrorsState) ? resolve() : reject(newErrorsState);
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e && e.preventDefault();
		return validateForm()
			.catch((validateErrors: any) => {
				throw validateErrors;
			}) // @TODO: TS
			.then(() => onSubmit(values));
	};

	const handleChange = (changes: any, changedValues?: any) => { // @TODO: refactor this to handle object with keys-values instead names and values arrays
		let newValues: any;
		if (isArray(changes) && isArray(changedValues)) {
			newValues = values;
			changes.forEach((name: any, index: number) => {
				newValues = set({ ...newValues }, name, changedValues[index]); // @TODO: Do we need to copy newValues object
			});
		} else if (typeof changes === 'object') {
			newValues = {
				...values,
				...changes,
			};
		}
		const updatedValues = set(
			Array.isArray(values)
				? [...values]
				: { ...values },
			changes,
			changedValues,
		);

		setValues(newValues || (
			isArray(updatedValues)
				? updatedValues.filter((updatedValue: any) => updatedValue !== null)
				: updatedValues
		));
		setErrorsState({});
	};

	const handleError = (error: any) => { // @TODO: TS
		setErrorsState({
			...errorsState,
			...error,
		});
	};

	useImperativeHandle(ref, () => ({
		get(name: string) {
			return values[name];
		},
		change(changes: any) { // @TODO: TS
			handleChange(Object.keys(changes), Object.values(changes));
		},
		reset(newValues = {}) {
			return new Promise((resolve) => {
				const formValues = { ...initialValues, ...newValues };
				setValues(formValues);
				setErrorsState(errors);
				resolve(formValues);
			});
		},
		submit(e: React.FormEvent) {
			return handleSubmit(e);
		},
		validate() {
			return validateForm();
		}
	}));

	const Component = inner ? 'div' : 'form';

	return (
		<Component
			className={classNames('_Form', className)}
			onSubmit={handleSubmit}
		>
			<Context.Provider value={{
				values,
				errors: errorsState,
				handleChange,
				handleError,
			}}
			>
				{typeof children === 'function'
					? (
						<Context.Consumer>{children}</Context.Consumer>
					) : children}
			</Context.Provider>
			<button type="submit" className="_Form__HiddenButton" aria-label="Submit" />
		</Component>
	);
});

// Form.Field = Field;

export default Form;

import './index.styl';
