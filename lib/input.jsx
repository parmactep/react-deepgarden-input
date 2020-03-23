import React, { useState } from 'react';
import classNames from 'classnames';

export default function input(inputClassName) {
	return (Component) => React.forwardRef(({
		className,
		onBlur,
		onFocus,
		...props
	}, ref) => {
		const [isFocused, setFocused] = useState(false);
		return (
			<label className={classNames(
				className,
				inputClassName,
				{ '_Input--isFocused': isFocused },
			)}
			>
				<Component
					{...props}
					ref={ref}
					onFocus={(e) => {
						setFocused(true);
						onFocus && onFocus(e);
					}}
					onBlur={(e) => {
						setFocused(false);
						onBlur && onBlur(e);
					}}
				/>
			</label>
		);
	});
}
