import React from 'react';
import { set, isArray } from 'lodash';
import classNames from 'classnames';

import Context from './Context';

export * from './Context';

import Field from './Field';
import Group from './Group';

type IValues = Record<string | number, any>;

export interface IFormProps {
	className?: string;
	initialValues?: IValues;
	errors?: Record<string, string>;
	validationSchema?: any;
	validate?: any;
	inner?: string;
	children?: any;
	onSubmit?: ((values: IValues) => void) | ((values: IValues, domain?: string) => Promise<void>)
}

interface IFormState {
	values?: IValues;
	errors?: Record<string, string>;
}

class Form extends React.Component<IFormProps, IFormState> {
	static defaultProps: Partial<IFormProps> = {
		initialValues: {},
		errors: {},
		validate: () => {},
		onSubmit: () => {},
	};

	static Field = Field;

	static Group = Group;

	state = {
		values: this.props.initialValues,
		errors: this.props.errors,
	};

	handleSubmit = async (e: React.FormEvent) => {
		e && e.preventDefault();
		return this.validate()
			.catch((errors) => { throw errors; })
			.then(() => this.props.onSubmit(this.state.values));
	};

	reset = (values = {}) => new Promise((resolve) => { // eslint-disable-line react/no-unused-class-component-methods
		this.setState({
			values: { ...this.props.initialValues, ...values },
			errors: this.props.errors,
		}, () => resolve(this.state.values));
	});

	submit = (e: React.FormEvent) => this.handleSubmit(e); // eslint-disable-line react/no-unused-class-component-methods

	handleChange = (names: any, values?: any) => { // @TODO: refactor this to handle object with keys-values instead names and values arrays
		let newValues: any;
		if (isArray(names) && isArray(values)) {
			newValues = this.state.values;
			names.forEach((name: any, index: number) => {
				newValues = set({ ...newValues }, name, values[index]);
			});
		} else if (typeof names === 'object') {
			newValues = {
				...this.state.values,
				...names,
			};
		}
		const updatedValues = set(Array.isArray(this.state.values)
			? [...this.state.values]
			: { ...this.state.values }, names, values);
		this.setState({
			values: newValues || (
				isArray(updatedValues)
					? updatedValues.filter((value: any) => value !== null)
					: updatedValues
			),
			errors: {},
		});
	};

	handleError = (error: any) => {
		this.setState({
			errors: {
				...this.state.errors,
				...error,
			},
		});
	};

	validate = () => new Promise<void>((resolve, reject) => {
		if (this.props.validationSchema) {
			console.log('VALIDATE', this.state.values);
			this.props.validationSchema
				.validate(this.state.values, {
					abortEarly: false,
				})
				.then(() => resolve());
		}
		this.setState({
			errors: {
				...this.state.errors,
				...this.props.validate(this.state.values),
			},
		}, () => (this.isValid() ? resolve() : reject(this.state.errors)));
	});

	isValid = () => Object
		.values(this.state.errors)
		.every((error) => !error);

	change = (names: any, values?: any) => { // eslint-disable-line react/no-unused-class-component-methods
		this.handleChange(names, values);
	};

	get(name: string) { // eslint-disable-line react/no-unused-class-component-methods
		return this.state.values[name];
	}

	render() {
		const Component = this.props.inner ? 'div' : 'form';
		return (
			<Component
				className={classNames('_Form', this.props.className)}
				onSubmit={this.handleSubmit}
			>
				{/* eslint-disable-next-line */}
				<Context.Provider value={{
					values: this.state.values,
					errors: this.state.errors,
					handleChange: this.handleChange,
					handleError: this.handleError,
				}}
				>
					{typeof this.props.children === 'function'
					&& <Context.Consumer>{this.props.children}</Context.Consumer>
					|| this.props.children}
				</Context.Provider>
				<button type="submit" className="_Form__HiddenButton" aria-label="Submit" />
			</Component>
		);
	}
}

export default Form;

import './index.styl';
