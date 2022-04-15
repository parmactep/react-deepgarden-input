import React from 'react';

export interface IFormContext {
	values?: any;
	handleChange?: (name: string, newValue: any) => void;
	errors?: Record<string, string>;
	handleError?: any;
}

const Context = React.createContext({} as IFormContext)

export default Context;
