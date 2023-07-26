import React, { useState, SyntheticEvent, FocusEvent } from 'react';
import classNames from 'classnames';

export interface IInputComponentProps {
	[x: string]: any;
	className?: string;
	onBlur?: (e: SyntheticEvent) => void;
	onFocus?: (e: FocusEvent) => void;
}

export default function input(inputClassName: string, Tag: React.ElementType = 'div') {
	return (Component: any) => React.forwardRef(({
		className,
		onBlur,
		onFocus,
		...rest
	}:IInputComponentProps, ref) => {
		const [isFocused, setFocused] = useState(false);
		return (
			<Tag className={classNames(
				className,
				inputClassName,
				{ '_Input--isFocused': isFocused },
			)}
			>
				<Component
					{...rest}
					ref={ref}
					onFocus={(e: FocusEvent<HTMLElement>) => {
						setFocused(true);
						onFocus && onFocus(e);
					}}
					onBlur={(e: SyntheticEvent<HTMLElement>) => {
						setFocused(false);
						onBlur && onBlur(e);
					}}
				/>
			</Tag>
		);
	});
}
