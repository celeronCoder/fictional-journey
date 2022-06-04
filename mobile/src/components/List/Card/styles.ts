import { StyleSheet } from "react-native";

const titleStyles = {
	fontSize: 16,
	lineHeight: 20,
	color: "#059669",
	marginLeft: 10,
};

export default StyleSheet.create({
	card: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		border: "1px solid #4ade80",
		borderRadius: 5,
		marginBottom: 5,
		paddingVertical: 20,
		paddingHorizontal: 15,
		width: "100%",
	},
	title: titleStyles,
	checked: {
		...titleStyles,
		color: "gray",
		textDecorationLine: "line-through",
	},
});
