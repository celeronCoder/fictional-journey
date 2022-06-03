import React from "react";
import { View, Text } from "react-native";
import Card from "./Card";
import styles from "./styles";

export default function List() {
	const [todos] = React.useState([
		{ id: 1, title: "Learn React Native", completed: false },
		{ id: 124, title: "Learn React Native", completed: false },
		{ id: 1234, title: "Learn React Native", completed: false },
		{ id: 1567, title: "Learn React Native", completed: false },
		{ id: 15, title: "Learn React Native", completed: false },
		{ id: 11, title: "Learn React Native", completed: false },
	]);

	return (
		<View style={styles.container}>
			{todos.map((todo) => (
				<Card key={todo.id} todo={todo} />
			))}
		</View>
	);
}
