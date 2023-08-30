import React, {
	forwardRef,
	ReactNode,
} from 'react';
import classNames from 'classnames';

import useForm, { IUseFormProps } from './useForm';
import Context, { IFormContext } from './Context';

export * from './Context';

export interface IFormProps extends IUseFormProps {
	className?: string;
	inner?: string;
	children?: ((context: IFormContext) => ReactNode) | ReactNode;
}

const Form = forwardRef(({
	className,
	inner,
	children,
	...props
}: IFormProps, ref) => {

	const {
		contextValue,
		handleSubmit,
	} = useForm(ref, props);


	const Component = inner ? 'div' : 'form';

	return (
		<Component
			className={classNames('_Form', className)}
			onSubmit={handleSubmit}
		>
			<Context.Provider value={contextValue}>
				{typeof children === 'function'
					? (
						<Context.Consumer>{children}</Context.Consumer>
					) : children}
			</Context.Provider>
			<button type="submit" className="_Form__HiddenButton" aria-label="Submit" />
		</Component>
	);
});

export default Form;

import './index.styl';
