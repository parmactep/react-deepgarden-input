import React, {
	ForwardRefExoticComponent,
	RefAttributes,
} from 'react';

import { IValue, IValues, IErrors } from './useForm';
import Form, { IFormProps } from './Form';
import Field from './Field';
import Group from './Group';

export * from './Context';

export interface IFormHandle {
	get: (name: string) => IValue;
	change: (changes: any) => void;
	reset: (newValues?: IValues) => void;
	submit: (e?: React.FormEvent) => void;
	validate: () => IErrors;
}

interface IForm extends ForwardRefExoticComponent<IFormProps & RefAttributes<IFormHandle>> {
	Field: typeof Field;
	Group: typeof Group;
}

const Compounded = Form as IForm;

Compounded.Field = Field;
Compounded.Group = Group;

export default Compounded;
