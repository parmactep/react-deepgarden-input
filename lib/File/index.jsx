import React from 'react';
import classNames from 'classnames';

import { Button, withClassName } from 'react-deepgarden';

import input from '../input';

export default
@withClassName('_Input')
class File extends React.Component {
	static defaultProps = {
		value: '',
	};
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
	_preventDefault = (e) => e.preventDefault();

	handleOpenInput = () => {
		this._input.click();
	};
	handleChange = (e) => {
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
	handleDrop = (e) => {
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
					<Button onClick={this.handleOpenInput}>Choose Files to Upload</Button>
					{this.props.withSampleFile}
					<input type="file" ref={(node) => this._input = node} onChange={this.handleChange} className="_FileInput__Input" />
				</div>
			</>
		);
	}
}

import './index.styl';
