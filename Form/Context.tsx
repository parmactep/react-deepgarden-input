import React from 'react';

export interface IFormContext {
	values?: any;
	handleChange?: (name: string | Record<string, any>, newValue?: any) => void;
	errors?: Record<string, string>;
	handleError?: any;
	handleSubmit: () => void;
}

const Context = React.createContext({} as IFormContext);

export default Context;
