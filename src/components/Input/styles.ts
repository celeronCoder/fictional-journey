import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		marginBottom: 10,
		padding: 5,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		width: "100%",
	},
	input: {
		padding: 5,
		lineHeight: 20,
		fontSize: 16,
		color: "#059669",
		borderBottomColor: "#059669",
		borderBottomWidth: 2,
		borderBottomRightRadius: 5,
		outlineWidth: 0,
		flex: 0.9,
	},
	button: {
		marginLeft: 5,
		padding: 10,
		border: "1px solid #059669",
		backgroundColor: "transparent",
		borderRadius: 5,
	},
	btnText: {
		color: "#059669",
		fontSize: 16,
	},
});
