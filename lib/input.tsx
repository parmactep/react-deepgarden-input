import React, { useState, FocusEvent } from 'react';
import classNames from 'classnames';

export interface IInputComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string;
}

export default function input(inputClassName: string, Tag: React.ElementType = 'label') {
	return (Component: any) => React.forwardRef(({
		className,
		onBlur,
		onFocus,
		...props
	}:IInputComponentProps, ref) => {
		const [isFocused, setFocused] = useState(false);
		const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
			setFocused(true);
			onFocus && onFocus(e);
		};

		const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
			setFocused(false);
			onBlur && onBlur(e);
		};
		return (
			<Tag className={classNames(
				className,
				inputClassName,
				{ '_Input--isFocused': isFocused },
			)}
			>
				<Component
					{...props}
					ref={ref}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
			</Tag>
		);
	});
}
