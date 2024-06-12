import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { CommonActions } from "@react-navigation/native";
import { SCREENS, SCREEN } from "../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { resetSelectedMovie } from "../redux/features/cinema";
import InfoItem from "../components/InfoItem";

export default function Ticket({ route }) {
	const { ticketId } = route.params;

	const { movieId, tickets } = useSelector((state) => state.movie);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetSelectedMovie({ id: movieId }));
	}, []);

	const ticket = tickets.find((ticket) => ticket.selectedTicketId === ticketId);

	const originalDate = new Date(ticket.selectedFullDate);
	const options = {
		weekday: "short",
		day: "2-digit",
		month: "short",
		year: "numeric"
	};
	const formattedDate = originalDate.toLocaleString("en-US", options);
	const formattedSeats =
		ticket.selectedSeats.selected[ticket.selectedCinema]?.join(", ") || "";
	const seats =
		ticket.selectedSeats.selected[ticket.selectedCinema]?.length || 0;

	return (
		<View>
			<ImageBackground
				source={{ uri: ticket.poster }}
				style={{
					width: SCREEN.width,
					height: SCREEN.height,
					alignSelf: "center",
					position: "absolute"
				}}>
				<View style={styles.overlay} />
			</ImageBackground>

			<ImageBackground
				source={require("../../assets/bigTicket5.png")}
				style={{
					width: SCREEN.width9,
					height: SCREEN.height8,
					alignSelf: "center",
					flexDirection: "column",
					justifyContent: "space-between"
				}}
				resizeMode="contain">
				<View
					style={{
						width: "80%",
						marginTop: 60,
						alignSelf: "center"
					}}>
					<InfoItem title="Film" text={ticket.title} />
					<InfoItem title="Cinema" text={ticket.selectedCinema} />
					<View
						style={{
							flexDirection: "row"
						}}>
						<View>
							<InfoItem title="Date" text={formattedDate} />
							<InfoItem title="Time" text={ticket.selectedTime} />
							<InfoItem title="Seats" text={formattedSeats} />
							<InfoItem title="Price" text={ticket.selectedTicketPrice} />
						</View>
						<View style={{ flexDirection: "row" }}>
							<Text style={styles.seats}>{seats}</Text>
							<Text style={styles.seatText}>Seats</Text>
						</View>
					</View>
				</View>
				<View
					style={{
						marginBottom: 60,
						width: "80%",
						marginLeft: "10%"
					}}>
					<Image
						source={require("../../assets/barcode.png")}
						style={{
							width: "100%"
						}}
					/>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(69,85,117,0.7)"
	},
	seats: {
		fontSize: 120,
		fontWeight: "bold",
		alignSelf: "flex-end",
		color: "#4B4B4B"
	},
	seatText: {
		position: "absolute",
		bottom: 30,
		left: 80
	}
});
