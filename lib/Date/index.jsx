import React from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';

import { DropDown, withClassName } from 'react-deepgarden';

import Text from '../Text';

import input from '../input';

export default
@withClassName('_Input')
@input('_DateInput')
class DateInput extends React.Component {
	static defaultProps = {
		calendarType: 'ISO 8601',
		locale: 'en-US',
		options: {
			timeZone: 'UTC',
			dateStyle: 'short',
		},
	};
	state = {
		isShowCalendar: false,
	};
	handleInputChange = () => {
	};
	handleCalendarChange = (date) => {
		!date.getHours() && date.setHours(Math.abs(date.getTimezoneOffset() / 60));
		this.props.onChange(date.toLocaleDateString(this.props.locale, this.props.options));
		this.hideCalendar();
	};
	showCalendar = () => {
		this.setState({
			isShowCalendar: true,
		});
	};
	hideCalendar = () => {
		this.setState({
			isShowCalendar: false,
		});
	};
	render() {
		const date = this.props.value ? new Date(this.props.value) : new Date();
		return (
			<>
				<Text
					value={this.props.value ? date.toLocaleDateString() : ''}
					onChange={this.handleInputChange}
					onClick={this.showCalendar}
					disabled={this.props.disabled}
				/>
				{this.state.isShowCalendar
				&& (
					<DropDown direction="top" onClose={this.hideCalendar}>
						<Calendar
							maxDate={this.props.maxDate}
							minDate={this.props.minDate}
							calendarType={this.props.calendarType}
							value={date}
							onChange={this.handleCalendarChange}
						/>
					</DropDown>
				)}
			</>
		);
	}
}

import './index.styl';
