import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import Animated, { useSharedValue } from "react-native-reanimated";
import BottomSheet from "@gorhom/bottom-sheet";
import MovieBackdrop from "../components/MovieBackdrop";
import { BORDER_RADIUS, CINEMAS, SCREEN } from "../common/constants";
import Dropdown from "../components/Dropdown";
import SeatingArrangement from "../components/SeatingArrangement";
import RoundedBtn from "../components/RoundedBtn";
import { showingTimes } from "../common/time";
import { getDatesForNextTwoWeeks } from "../common/helpers";
import CustomDropdown from "../components/CustomDropdown";
import { useSelector, useDispatch } from "react-redux";
import ActionFooter from "../components/ActionFooter";
import {
	setSelectedCinema,
	setSelectedDate,
	setSelectedMovie,
	setSelectedTime
} from "../redux/features/cinema";
import Confirmation from "./Confirmation";

const _times = showingTimes.map((time) => ({
	label: time.time,
	value: time.time
}));
const days = getDatesForNextTwoWeeks().map((dateData) => {
	const { date, day, fullDate } = dateData;
	let formatedDate = `${day.split(",")[0]}, ${date}`;

	const today = new Date().getDate();
	const tomorrow = new Date(
		new Date().getTime() + 24 * 60 * 60 * 1000
	).getDate();
	if (date === today) {
		formatedDate = `Today, ${date}`;
	} else if (date === tomorrow) {
		formatedDate = `Tomorrow, ${date}`;
	}

	const label = formatedDate;
	const value = `${day.split(",")[0]}, ${date}`;

	return { label, value, extra: date, fullDate };
});

const cinemas = [
	{ label: CINEMAS.Acacia, value: CINEMAS.Acacia },
	{ label: CINEMAS.Metroplex, value: CINEMAS.Metroplex },
	{ label: CINEMAS.Arena, value: CINEMAS.Arena }
];

const MovieSeats = ({ route, navigation }) => {
	const { brief, movieDetails } = route.params;
	const cinema = useSelector((state) => state.cinema);
	const {
		selectedCinema,
		selectedDate,
		selectedFullDate,
		selectedTime,
		selectedSeats
	} = cinema[brief.key];
	const translateY = useSharedValue(0);

	const dispatch = useDispatch();

	const bottomSheetRef = useRef(null);

	const snapPoints = useMemo(() => ["1%", "50%"], []);

	const handleSheetChanges = useCallback((index) => {}, []);

	const image = { uri: brief.poster };
	const cinemaLabel = { label: selectedCinema, value: selectedCinema };
	const cinemaTime = { label: selectedTime, value: selectedTime };
	const _cinemaDate = days.find((day) => {
		const _date = new Date(selectedFullDate).getDate();
		return day.extra === _date;
	});

	const segueToPayment = () => {
		if (selectedSeats.selected[selectedCinema].length > 0) {
			bottomSheetRef.current.expand();
		} else {
			alert("Please select a seat");
		}
	};

	const setWatchDate = (date) => {
		dispatch(
			setSelectedMovie({
				date: date.extra,
				id: brief.key,
				fullDate: String(date.fullDate)
			})
		);
	};

	const setWatchCinema = (cinema) => {
		dispatch(setSelectedCinema({ cinema: cinema.value, id: brief.key }));
	};

	const setWatchTime = (time) => {
		dispatch(
			setSelectedTime({
				time: time.value,
				cinema: selectedCinema,
				id: brief.key
			})
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<MovieBackdrop
				navigation={navigation}
				translateY={translateY}
				image={image}
			/>
			<Animated.ScrollView>
				<View style={styles.movieDetail}>
					<Text style={styles.movieTitle}>{brief.title}</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between"
						}}>

              
						<View style={{ width: "48%" }}>
							<Dropdown
								listItems={days}
								defaultItem={_cinemaDate}
								handlePress={setWatchDate}
							/>
						</View>



						<View style={{ width: "48%" }}>
							<Dropdown
								listItems={_times}
								defaultItem={cinemaTime}
								handlePress={setWatchTime}
							/>
						</View>
					</View>


					<View style={{ height: 10 }} />
					<Dropdown
						listItems={cinemas}
						defaultItem={cinemaLabel}
						handlePress={setWatchCinema}
						pickerStyles={{
							top: 154,
							left: 15
						}}
					/>
				</View>
				<View
					style={{
						height: 400,
						zIndex: -1,
						marginTop: 40,
						marginHorizontal: 20
					}}>
					<SeatingArrangement movieBrief={brief} />
				</View>
				<ActionFooter handlePress={segueToPayment} />
			</Animated.ScrollView>
			<Confirmation ref={bottomSheetRef} movieBrief={brief} />
		</View>
	);
};

export default MovieSeats;

const styles = StyleSheet.create({
	movieDetail: {
		width: SCREEN.width9,
		backgroundColor: "white",
		alignSelf: "center",
		marginTop: SCREEN.height1,
		borderRadius: BORDER_RADIUS.xLarge,
		borderColor: "#CCD2D8",
		borderWidth: 0.4,
		paddingVertical: 25,
		paddingHorizontal: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.36,
		shadowRadius: 6.68,
		elevation: 11
	},
	movieTitle: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10
	},
	seatInfo: {
		width: SCREEN.width9,
		borderColor: "#C4C9DF",
		borderWidth: 0.4,
		alignSelf: "center",
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
		height: 60,
		borderRadius: 30,
		paddingLeft: 20,
		justifyContent: "space-between"
	},
	seatNumView: {
		flexDirection: "row",
		alignItems: "center",
		height: "100%"
	},
	seatNumText: {
		fontSize: 20,
		paddingBottom: 5,
		color: "#868E96"
	},
	divider: {
		borderLeftWidth: 1,
		borderLeftColor: "#C4C9DF",
		height: "60%",
		marginHorizontal: 20
	},
	heading: {
		fontSize: 12
	},
	text: {
		fontSize: 18,
		fontWeight: "bold"
	}
});
