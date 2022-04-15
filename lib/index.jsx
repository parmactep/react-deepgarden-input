import React from 'react';

import Text from './Text';
import Number from './Number';
import Textarea from './Textarea';
import Select from './Select';
import Checkbox from './Chekbox';
import Radio from './Radio';
import Tabs from './Tabs';
import Image from './Image';
import File from './File';
import ImageUpload from './ImageUpload';
import Password from './Password';

import Date from './Date';
import Percent from './Percent';
import Toggle from './Toggle';

const types = {
	number: Number,
	textarea: Textarea,
	checkbox: Checkbox,
	radio: Radio,
	tabs: Tabs,
	select: Select,
	image: Image,
	date: Date,
	percent: Percent,
	password: Password,
	toggle: Toggle,
	file: File,
	imageUpload: ImageUpload,
};

export default React.forwardRef((props, ref) => {
	const Component = types[props.type] || Text;
	return Component && <Component {...props} ref={ref} />;
});
