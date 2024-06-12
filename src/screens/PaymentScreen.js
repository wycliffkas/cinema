import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import MovieBackdrop from "../components/MovieBackdrop";
import { useSharedValue } from "react-native-reanimated";
import { SCREENS } from "../common/constants";

const paymentOptions = [
	{ provider: "MTN", phone: "0777 123 456" },
	{ provider: "Airtel", phone: "0700 123 456" }
];

const PaymentScreen = ({ route, navigation }) => {
	return (
		<View style={{ flex: 1, backgroundColor: "#fff" }}>
			<TouchableOpacity style={styles.listItemWrap}>
				<View style={{ flex: 2 }}>
					<View style={styles.icon}>
						<Entypo name="plus" size={28} color="black" />
					</View>
				</View>
				<View style={{ flex: 8 }}>
					<View style={styles.text}>
						<Text style={{ fontSize: 16 }}>Add another payment method</Text>
						<Entypo name="chevron-right" size={24} color="black" />
					</View>
				</View>
			</TouchableOpacity>
			{paymentOptions.map((item, index) => (
				<TouchableOpacity
					key={index}
					style={styles.listItemWrap}
					onPress={() => navigation.navigate(SCREENS.ConfirmTransaction)}>
					<View style={{ flex: 2 }}>
						<View style={styles.icon}>
							<FontAwesome5 name="sim-card" size={24} color="black" />
						</View>
					</View>
					<View
						style={{
							flex: 8,
							justifyContent: "space-between",
							flexDirection: "row",
							alignItems: "center"
						}}>
						<View
							style={{
								flexDirection: "column"
							}}>
							<Text style={{ fontSize: 16, fontWeight: "bold" }}>
								{item.provider}
							</Text>
							<Text style={{ fontSize: 14 }}>{item.phone}</Text>
						</View>
						<Entypo name="chevron-right" size={24} color="black" />
					</View>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default PaymentScreen;

const styles = StyleSheet.create({
	listItemWrap: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: "white",
		elevation: 3
	},
	icon: {
		width: 40,
		height: 40,
		borderRadius: 5,
		backgroundColor: "#D9D9D9",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 30
	},
	text: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%"
	}
});
