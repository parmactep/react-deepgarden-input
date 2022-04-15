import React, { useState } from 'react';
import classNames from 'classnames';

interface IinputComponentProps {
	[x: string]: any;
	className?: string;
	onBlur?: (e: React.SyntheticEvent) => void;
	onFocus?: (e: React.FocusEvent) => void;
}

export default function input(inputClassName: string, Tag: any = 'label') {
	return (Component: any) => React.forwardRef(({
		className,
		onBlur,
		onFocus,
		...props
	}:IinputComponentProps, ref) => {
		const [isFocused, setFocused] = useState(false);
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
					onFocus={(e: any) => {
						setFocused(true);
						onFocus && onFocus(e);
					}}
					onBlur={(e: any) => {
						setFocused(false);
						onBlur && onBlur(e);
					}}
				/>
			</Tag>
		);
	});
}
