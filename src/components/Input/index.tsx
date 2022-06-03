import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Input() {
	const [value, setValue] = React.useState<string>("");

	return (
		<View style={styles.container}>
			<TextInput
				// @ts-ignore
				autoCorrect={false}
				style={styles.input}
				defaultValue={value}
				onChangeText={(text) => setValue(text)}
			/>
			<TouchableOpacity style={styles.button}>
				<Text style={styles.btnText}>do.</Text>
			</TouchableOpacity>
		</View>
	);
}
