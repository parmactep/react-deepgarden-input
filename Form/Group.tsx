import React from 'react';

interface IGroup extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
	controls?: React.ReactNode;
	children?: React.ReactNode;
}

export default function ({ title, controls, children, ...props }: IGroup) {
	return (
		<div className="_Form__Group" {...props}>
			{(title || controls)
			&& (
				<div className="_Form__GroupHeader">
					{title && (
						<div className="_Form__GroupTitle">
							{title}
							:
						</div>
					)}
					{controls}
				</div>
			)}
			{children}
		</div>
	);
}
