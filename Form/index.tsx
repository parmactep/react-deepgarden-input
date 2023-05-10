import React from 'react';
import { set } from 'lodash';
import classNames from 'classnames';

import Context, { IFormContext } from './Context';

export * from './Context';

import Field from './Field';
import Group from './Group';

type IValues = Record<string | number, any>;

interface IFormProps {
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
	state = {
		values: this.props.initialValues,
		errors: this.props.errors,
	};
	static defaultProps: Partial<IFormProps>;
	static Field = Field;
	static Group = Group;


	get(name: string) {
		return this.state.values[name];
	};
	change = (change: any) => {
		this.handleChange(Object.keys(change), Object.values(change));
	};
	isValid = () => {
		for (let key in this.state.errors) {
			if (!!this.state.errors[key]) {
				return false;
			}
		}
		return true;
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
		}, () => this.isValid() ? resolve() : reject(this.state.errors));
	});
	handleError = (error: any) => {
		this.setState({
			errors: {
				...this.state.errors,
				...error,
			},
		});
	};
	handleChange = (names: any, values?: any) => { // @TODO: refactor this to handle object with keys-values instead names and values arrays
		let newValues: any;
		if (this.isArray(names) && this.isArray(values)) {
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
				this.isArray(updatedValues)
					? updatedValues.filter((value: any) => value !== null)
					: updatedValues
			),
			errors: {},
		});
	};
	submit = (e: React.FormEvent) => {
		return this.handleSubmit(e);
	};
	reset = (values = {}) => {
		return new Promise((resolve) => {
			this.setState({
				values: {...this.props.initialValues, ...values},
				errors: this.props.errors,
			}, () => resolve(this.state.values));
		});
	};
	handleSubmit = (e: React.FormEvent) => {
		e && e.preventDefault();
		return this.validate()
			.catch((errors) => { throw errors; })
			.then(() => this.props.onSubmit(this.state.values));
	};
	isArray(value: any) {
		return value && typeof value === 'object' && value.constructor === Array;
	}
	render() {
		const Component = this.props.inner ? 'div' : 'form';
		return (
			<Component
				className={classNames('_Form', this.props.className)}
				onSubmit={this.handleSubmit}
			>
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
				<button type="submit" className="_Form__HiddenButton" />
			</Component>
		);
	}
}

Form.defaultProps = {
	initialValues: {},
	errors: {},
	validate: () => {},
	onSubmit: () => {},
};

export default Form;

import './index.styl';
