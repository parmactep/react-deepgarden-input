import React from 'react';
import { View, TextInput as RNTextInput } from 'react-native';

import { withClassName } from 'react-deepgarden';

import input from '../input';

import styles from './index.native.styl';

interface ITextInputProps {
	onChange?: (values: string) => void;
	value?: string;
	secureTextEntry?: boolean;
	postfix?: string;
}

function TextInput({
	value,
	onChange,
	secureTextEntry = false,
	postfix,
}: ITextInputProps) {

	return (
		<View style={styles.wrapper}>
			<RNTextInput
				style={styles.input}
				onChangeText={onChange}
				value={value}
				secureTextEntry={secureTextEntry}
			/>
			{!!postfix && (
				<View>
					{postfix}
				</View>
			)}
		</View>
	);
}

export default withClassName('_Input')(input('_TextInput')(TextInput));
