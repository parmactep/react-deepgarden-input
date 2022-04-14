import React from 'react';
import { set } from 'lodash';

import Context from './Context';

import Field from './Field';
import Group from './Group';

interface IFormProps {
	initialValues?: any;
    errors?: any;
	validationSchema?: any;
	validate?: any;
	inner?: string;
	children?: any;
	onSubmit?: (...values: any ) => any 
}

interface IFormState {
	values?: any;
    errors?: any;
}

interface IFormDefaultProps { 
	initialValues?: any; 
	errors?: any; 
	validate: () => void; 
	onSubmit: () => void; 
}

class Form extends React.Component<IFormProps, IFormState>{
	state = {
		values: this.props.initialValues,
		errors: this.props.errors,
	};
	static defaultProps: IFormDefaultProps;
	static Field: any;
	static Group: any;


	get = (name: any) => {
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
	handleChange = (names: any, values: any) => { // @TODO: refactor this to handle object with keys-values instead names and values arrays
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
		const updatedValues = set(this.isArray(this.state.values)
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
		this.handleSubmit(e);
	};
	reset = (values = {}) => {
		this.setState({
			values: {...this.props.initialValues, ...values},
			errors: this.props.errors,
		});
	};
	handleSubmit = (e: React.FormEvent) => {
		e && e.preventDefault();
		this.validate()
			.catch((errors) => { throw errors; })
			.then(() => this.props.onSubmit(this.state.values));
	};
	isArray(value: any) {
		return value && typeof value === 'object' && value.constructor === Array;
	}
	render() {
		const Component = this.props.inner ? 'div' : 'form';
		return (
			<Component className="_Form" onSubmit={this.handleSubmit}>
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

Form.Field = Field;
Form.Group = Group;

export default Form;

import './index.styl';
