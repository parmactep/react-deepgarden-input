import React from 'react';

interface IFormContext{
	values?: string;
	handleChange?: any;
	errors?: any;
	handleError?: any;
}

const Context = React.createContext({} as IFormContext)

export default Context;
