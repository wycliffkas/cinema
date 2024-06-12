import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import BookNow from "../components/BookNow";
import { BORDER_RADIUS, SCREEN, SCREENS } from "../common/constants";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-native-uuid";
import { seats } from "../common/seats";
import { setSelectedTicketId } from "../redux/features/cinema";
import InfoItem from "../components/InfoItem";

const Confirmation = React.forwardRef((props, ref) => {
	const snapPoints = useMemo(() => ["1%", "55%"], []);

	const dispatch = useDispatch();

	const cinema = useSelector((state) => state.cinema);
	const { movieBrief } = props;
	const {
		selectedCinema,
		selectedDate,
		selectedFullDate,
		selectedTime,
		selectedSeats,
		selectedTicketPrice
	} = cinema[movieBrief.key];

	const navigation = useNavigation();

	const handleSheetChanges = useCallback((index) => {}, []);

	const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={0}
				appearsOnIndex={1}
			/>
		),
		[]
	);

	const originalDate = new Date(selectedFullDate);
	const options = {
		weekday: "short",
		day: "2-digit",
		month: "short",
		year: "numeric"
	};
	const formattedDate = originalDate.toLocaleString("en-US", options);
	const formattedSeats =
		selectedSeats.selected[selectedCinema]?.join(", ") || "";
	const seats = selectedSeats.selected[selectedCinema]?.length || 0;

	const segueToPayment = () => {
		dispatch(
			setSelectedTicketId({
				id: movieBrief.key,
				ticketId: uuid.v4()
			})
		);
		navigation.navigate(SCREENS.PaymentScreen);
	};

	return (
		<BottomSheet
			ref={ref}
			index={0}
			snapPoints={snapPoints}
			backdropComponent={renderBackdrop}
			onChange={handleSheetChanges}
			style={styles.bottomSheet}>
			<View style={styles.contentContainer}>
				<InfoItem title="Film" text="Ant Man and The Wasp" />
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between"
					}}>
					<View>
						<InfoItem title="Cinema" text={selectedCinema} />
						<InfoItem title="Date" text={formattedDate} />
						<InfoItem title="Time" text={selectedTime} />
						<InfoItem title="Seat" text={formattedSeats} />
						<InfoItem title="Total Price" text={selectedTicketPrice} />
					</View>
					<View style={{ flexDirection: "column", justifyContent: "flex-end" }}>
						<Text style={styles.seats}>{seats}</Text>
						<Text style={styles.seatText}> Seats </Text>
					</View>
				</View>
			</View>
			<View style={styles.buttonWrapper}>
				<BookNow title="Confirm" handlePress={segueToPayment} />
			</View>
		</BottomSheet>
	);
});

export default Confirmation;

const styles = StyleSheet.create({
	bottomSheet: {
		borderWidth: 0.4,
		borderColor: "#CCD2D8",
		borderTopLeftRadius: BORDER_RADIUS.xxLarge,
		borderTopRightRadius: BORDER_RADIUS.xxLarge,
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -5
		},
		shadowOpacity: 0.36,
		shadowRadius: 6.68,
		elevation: 11
	},
	contentContainer: {
		width: SCREEN.width8,
		alignSelf: "center",
		marginTop: 10
	},
	heading: {
		fontSize: 12
	},
	text: {
		fontSize: 18,
		fontWeight: "bold"
	},
	infoWrapper: {
		marginVertical: 5
	},
	seats: {
		fontSize: 120,
		fontWeight: "bold",
		alignSelf: "flex-end",
		color: "#4B4B4B"
	},
	seatText: {
		flexDirection: "column",
		alignSelf: "center",
		position: "absolute",
		botom: 0
	},
	buttonWrapper: {
		width: SCREEN.width9,
		alignSelf: "center",
		marginTop: 30
	}
});
