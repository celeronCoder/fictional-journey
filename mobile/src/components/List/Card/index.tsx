import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";

interface CardProps {
	todo: {
		id: number;
		title: string;
		completed: boolean;
	};
}

export default function Card({ todo }: CardProps) {
	const [checked, setChecked] = React.useState(todo.completed);

	return (
		<View style={styles.card}>
			<BouncyCheckbox
				fillColor="#059669"
				useNativeDriver
				iconStyle={{ borderRadius: 7 }}
				onPress={() => setChecked(!checked)}
				textComponent={
					<Text style={checked ? styles.checked : styles.title}>
						{todo.title}
					</Text>
				}
			/>
			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity>
					<Icon name="pencil-outline" size={20} color="gray" />
				</TouchableOpacity>
				<TouchableOpacity style={{ marginLeft: 5 }}>
					<Icon name="trash-can-outline" size={20} color="red" />
				</TouchableOpacity>
			</View>
		</View>
	);
}
