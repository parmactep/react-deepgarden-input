import React from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';

import { DropDown, portal } from 'react-deepgarden';

export default
@portal({ className: '_Calendar__DropDown' })
class CalendarDropDown extends React.Component {
	render() {
		const margingTop = 20;
		const margingLeft = 100;
		return (
			<DropDown
				direction="top"
				onClose={this.props.hideCalendar}
				style={{ top: this.props.coordinats.top + margingTop, left: this.props.coordinats.left + margingLeft }}
			>
				<Calendar
					maxDate={this.props.maxDate}
					minDate={this.props.minDate}
					calendarType={this.props.calendarType}
					value={this.props.value}
					onChange={this.props.handleCalendarChange}
				/>
			</DropDown>
		);
	}
}

import './index.styl';
