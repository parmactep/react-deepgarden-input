import React from 'react';

import Text from './Text';

interface ITypes {
	[x: string]: any;
}

const types: ITypes = {
	text: Text,
};

interface IInputProps {
	[x: string]: any;
	type?: string; // @TODO: key of types
}

const Input = React.forwardRef((
	{ type = 'text', ...props }: IInputProps,
	ref: any
) => {
	const Component = types[type];
	return (
		<Component
			{...props}
			ref={ref}
		/>
	);
});

export default Input;
