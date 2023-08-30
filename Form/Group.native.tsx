import React from 'react';
import { View } from 'react-native';

interface IGroup {
	title?: string;
	controls?: React.ReactNode;
	children?: React.ReactNode;
}

function Group({
	title,
	controls,
	children,
}: IGroup) {
	return (
		<View>
			{(title || controls)
			&& (
				<View>
					{title && (
						<View>
							{title}
							:
						</View>
					)}
					{controls}
				</View>
			)}
			{children}
		</View>
	);
}

export default Group;
