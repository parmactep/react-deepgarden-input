import React, { useState, SyntheticEvent } from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';
import moment from 'moment';

import { withClassName, OutsideClick } from 'react-deepgarden';

import Text from '../Text';

import input from '../input';

interface IDateInputProps {
	onChange: (date: string) => void;
	calendarType?: any;
	locale?: string;
	options?: Intl.DateTimeFormatOptions;
	value: any;
	disabled: boolean;
	maxDate?: Date;
	minDate?: Date;
	momentFormat?: null;
}

function DateInput({
	onChange,
	calendarType = 'ISO 8601',
	locale = 'en-US',
	options = {
		timeZone: 'UTC',
		dateStyle: 'short',
	},
	value,
	disabled,
	maxDate,
	minDate,
	momentFormat,
}: IDateInputProps) {
	const [isShowCalendar, setIsShowCalendar] = useState(false);

	const handleCalendarChange = (date: Date) => {
		!date.getHours() && date.setHours(Math.abs(date.getTimezoneOffset() / 60));
		onChange(date.toLocaleDateString(locale, options));
		toggleCalendar();
	};

	const toggleCalendar = (e?: Event) => {
		e?.preventDefault();
		e?.stopPropagation();
		setIsShowCalendar(!isShowCalendar);
	};

	const date = value
		? moment(value).toDate()
		: moment().startOf('day').toDate();

	return (
		<>
			<Text
				value={value
					? momentFormat
						? moment(date).format(momentFormat)
						: date.toLocaleDateString()
					: ''}
				onClick={toggleCalendar}
				disabled={disabled}
			/>
			{isShowCalendar
			&& (
				<OutsideClick
					onClickOutside={toggleCalendar}
				>
					<div className="_DateInput__DropDown">
						<Calendar
							maxDate={maxDate}
							minDate={minDate}
							calendarType={calendarType}
							value={date}
							onChange={handleCalendarChange}
						/>
					</div>
				</OutsideClick>
			)}
		</>
	);
}

import './index.styl';

export default withClassName('_Input')(input('_DateInput', 'div')(DateInput));
