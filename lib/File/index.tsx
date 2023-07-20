import React from 'react';
import classNames from 'classnames';

import { Button, withClassName } from 'react-deepgarden';

import input from '../input';

interface IFileProps {
	onChange?:(file: globalThis.File) => void;
	dropZone?: any;
	withSampleFile?: any;
}

class File extends React.Component<IFileProps> {
	_preventDefault = (e: any) => e.preventDefault();

	private _input: any;

	state = {
		isHighlight: false,
	};

	componentDidMount() {
		window.addEventListener('dragover', this._preventDefault, false);
		window.addEventListener('drop', this._preventDefault, false);
	}

	componentWillUnmount() {
		window.removeEventListener('dragover', this._preventDefault, false);
		window.addEventListener('drop', this._preventDefault, false);
	}

	handleOpenInput = () => {
		this._input.click();
	};

	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files[0];
		this.props.onChange(file);
	};

	handleDragEnter = () => {
		this.setState({
			isHighlight: true,
		});
	};

	handleDragLeave = () => {
		this.setState({
			isHighlight: false,
		});
	};

	handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		this.props.onChange(file);
	};

	render() {
		return (
			<>
				<div
					className={classNames('_FileInput__DropZone', { '_FileInput__DropZone--isHighlight': this.state.isHighlight })}
					onDragEnter={this.handleDragEnter}
					onDragLeave={this.handleDragLeave}
					onDrop={this.handleDrop}
				>
					{this.props.dropZone}
				</div>
				<div className="_FileInput__Image">
					<Button onClick={this.handleOpenInput} _type={undefined} _size={undefined}>Choose Files to Upload</Button>
					{this.props.withSampleFile}
				</div>
				<input type="file" ref={this._input} onChange={this.handleChange} className="_FileInput__Input" />
			</>
		);
	}
}

import './index.styl';

export default withClassName('_Input')(input('_FileInput', 'div')(File));
