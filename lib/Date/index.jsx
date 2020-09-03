import React from 'react';

import { withClassName } from 'react-deepgarden';

import Text from '../Text';

import input from '../input';

import CalendarDropDown from './CalendarDropDown';

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
	showCalendar = (e) => {
		this.setState({
			isShowCalendar: e.target,
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
					onClick={(e) => this.showCalendar(e)}
					disabled={this.props.disabled}
				/>
				{this.state.isShowCalendar
				&& (
					<CalendarDropDown
						maxDate={this.props.maxDate}
						minDate={this.props.minDate}
						calendarType={this.props.calendarType}
						coordinats={this.state.isShowCalendar.getBoundingClientRect()}
						value={date}
						handleCalendarChange={this.handleCalendarChange}
						hideCalendar={this.hideCalendar}
					/>
				)}
			</>
		);
	}
}

import './index.styl';
