import React, { useState, useRef, useEffect, ReactElement } from 'react';
import classNames from 'classnames';

import { Button, withClassName } from 'react-deepgarden';

import input from '../input';

export interface IFileProps {
	onChange?:(file: globalThis.File) => void;
	dropZone?: ReactElement;
	withSampleFile?: ReactElement;
}

function File({
	onChange,
	dropZone,
	withSampleFile,
}: IFileProps) {
	const [isHighlight, setIsHighlight] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const _preventDefault = (e: Event) => e.preventDefault();

	useEffect(() => {
		window.addEventListener('dragover', _preventDefault, false);
		window.addEventListener('drop', _preventDefault, false);

		return () => {
			window.removeEventListener('dragover', _preventDefault, false);
			window.removeEventListener('drop', _preventDefault, false);
		};
	}, []);

	const handleOpenInput = () => {
		inputRef.current.click();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files[0];
		onChange(file);
	};

	const handleDragEnter = () => {
		setIsHighlight(true);
	};

	const handleDragLeave = () => {
		setIsHighlight(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		onChange(file);
	};

	return (
		<>
			<div
				className={classNames('_FileInput__DropZone', { '_FileInput__DropZone--isHighlight': isHighlight })}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				{dropZone}
			</div>
			<div className="_FileInput__Image">
				<Button onClick={handleOpenInput} _type={undefined} _size={undefined}>
					Choose Files to Upload
				</Button>
				{withSampleFile}
			</div>
			<input type="file" ref={inputRef} onChange={handleChange} className="_FileInput__Input" />
		</>
	);
}

import './index.styl';

export default withClassName('_Input')(input('_FileInput', 'div')(File));
