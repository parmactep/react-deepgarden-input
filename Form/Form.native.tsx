import React, {
	forwardRef,
	ReactNode,
} from 'react';
import { View } from 'react-native';

import useForm, { IUseFormProps } from './useForm';
import Context, { IFormContext } from './Context';

export * from './Context';

export interface IFormProps extends IUseFormProps {
	children?: ((context: IFormContext) => ReactNode) | ReactNode;
}

const Form = forwardRef(({
	children,
	...props
}: IFormProps, ref) => {

	const {
		contextValue,
	} = useForm(ref, props);

	return (
		<Context.Provider value={contextValue}>
			{typeof children === 'function'
				? (
					<Context.Consumer>{children}</Context.Consumer>
				) : children}
		</Context.Provider>
	);
});

export default Form;
