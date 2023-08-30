import React, { SyntheticEvent, FocusEvent } from 'react';
import { View } from 'react-native';

export interface IInputComponentProps {
	[x: string]: any;
	onBlur?: (e: SyntheticEvent) => void;
	onFocus?: (e: FocusEvent) => void;
}

export default function input(inputClassName: string) {
	return (Component: any) => React.forwardRef(({
		onBlur,
		onFocus,
		...props
	}: IInputComponentProps, ref) => {
		return (
			<View>
				<Component
					{...props}
					ref={ref}
					onFocus={(e: FocusEvent<HTMLElement>) => {
						onFocus && onFocus(e);
					}}
					onBlur={(e: SyntheticEvent<HTMLElement>) => {
						onBlur && onBlur(e);
					}}
				/>
			</View>
		);
	});
}
