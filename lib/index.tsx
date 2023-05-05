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
import Date from './Date';
import Percent from './Percent';
import Toggle from './Toggle';

const types: Record<string, any> = {
	number: Number,
	textarea: Textarea,
	checkbox: Checkbox,
	radio: Radio,
	tabs: Tabs,
	select: Select,
	image: Image,
	date: Date,
	percent: Percent,
	toggle: Toggle,
	file: File,
	imageUpload: ImageUpload,
};

interface Iinput extends React.InputHTMLAttributes<HTMLInputElement> {
	type?: string;
}

const input = React.forwardRef((props: Iinput, ref: React.Ref<any>) => {
	const Component = types[props.type] || Text;
	return Component && <Component {...props} ref={ref} />;
});

export default input;
