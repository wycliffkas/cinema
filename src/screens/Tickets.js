import {
	FlatList,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import React from "react";
import { SCREEN } from "../common/constants";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const SingleTicket = ({ info }) => {
	const navigation = useNavigation();

	const {
		title,
		poster,
		selectedFullDate,
		selectedTime,
		selectedSeats,
		selectedCinema
	} = info;

	const { selected } = selectedSeats;

	const formattedDate = new Date(selectedFullDate).toLocaleString("en-US", {
		weekday: "short",
		day: "2-digit",
		month: "short"
	});

	const seatTotal = selected[selectedCinema].length;
	const seats = selected[selectedCinema].join(", ");

	const segueToTicket = () => {
		navigation.navigate("Ticket", { ticketId: info.selectedTicketId });
	};

	console.log("info", info);

	return (
		<ImageBackground
			source={require("../../assets/__ticket6.png")}
			style={{
				width: SCREEN.width9,
				height: 160,
				alignSelf: "center",
				marginBottom: 10
			}}
			resizeMode="contain">
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={segueToTicket}
				style={{
					flex: 1,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between"
				}}>
				<Image
					source={{ uri: poster }}
					style={{
						width: 100,
						height: 100,
						borderRadius: 5,
						marginLeft: 25,
						marginTop: -4
					}}
				/>
				<View
					style={{
						width: 150,
						height: 110,
						marginRight: 30
					}}>
					<Text
						numberOfLines={1}
						style={{
							fontWeight: "bold",
							fontSize: 15,
							marginBottom: 5
						}}>
						{title}
					</Text>

					<View
						style={{
							flexDirection: "row"
						}}>
						<Text
							style={{
								fontWeight: "bold",
								color: "#aaa"
							}}>
							Date:
						</Text>
						<Text
							style={{
								marginLeft: 10,
								fontWeight: "bold"
							}}>
							{formattedDate}
						</Text>
					</View>

					<View
						style={{
							flexDirection: "row"
						}}>
						<Text
							style={{
								fontWeight: "bold",
								color: "#aaa"
							}}>
							Time:
						</Text>

						<Text
							style={{
								marginLeft: 10,
								fontWeight: "bold"
							}}>
							{selectedTime}
						</Text>
					</View>

					<View
						style={{
							flexDirection: "row"
						}}>
						<Text
							style={{
								fontWeight: "bold",
								color: "#aaa"
							}}>
							Seat Total:
						</Text>
						<Text
							style={{
								marginLeft: 10,
								fontWeight: "bold"
							}}>
							{seatTotal}
						</Text>
					</View>
          
					<View
						style={{
							flexDirection: "row"
						}}>
						<Text
							style={{
								fontWeight: "bold",
								color: "#aaa"
							}}>
							Seats:
						</Text>
						<Text
							style={{
								marginLeft: 10,
								fontWeight: "bold"
							}}>
							{seats}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</ImageBackground>
	);
};

const Tickets = () => {
	const { tickets } = useSelector((state) => state.movie);

	return (
		<View
			style={{
				paddinggTop: 20,
				flex: 1,
				backgroundColor: "#eee"
			}}>
			<FlatList
				data={tickets}
				keyExtractor={(item, index) => item.id.toString()}
				renderItem={({ item }) => <SingleTicket info={item} />}
				ListEmptyComponent={() => (
					<View style={{ alignItems: "center", marginTop: 20 }}>
						<Text style={{ fontSize: 20, fontWeight: "bold" }}>
							No tickets yet
						</Text>
					</View>
				)}
			/>
		</View>
	);
};

export default Tickets;

const styles = StyleSheet.create({});
