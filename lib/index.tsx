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

interface ITypes {
	[x: string]: any;
}

const types: ITypes = {
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

interface IInput {
	[x: string]: any;
	type: string; // @TODO: key of types
}

const input = React.forwardRef((props: IInput, ref: any) => {
	const Component = types[props.type] || Text;
	return Component && <Component {...props} ref={ref} />;
});

export default input;
