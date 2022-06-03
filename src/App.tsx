import { registerRootComponent } from "expo";
import { StyleSheet, Text, View } from "react-native";
import { Input, List } from "./components";

const styles = StyleSheet.create({
	root: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "100vh",
		backgroundColor: "#d1fae5",
	},
	topContainer: {
		width: `${(34 / 40) * 100}%`,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	heading: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#059669",
		marginBottom: 50,
	},
});

function App() {
	return (
		<View style={styles.root}>
			<View style={styles.topContainer}>
				<Text style={styles.heading}>Fictional Journey</Text>
				<Input />
			</View>
			<List />
		</View>
	);
}

export default registerRootComponent(App);
