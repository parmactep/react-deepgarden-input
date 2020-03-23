import React from 'react';

export default function ({ title, controls, children, ...props }) {
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
