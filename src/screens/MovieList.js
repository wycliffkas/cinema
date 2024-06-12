import * as React from "react";
import {
	StatusBar,
	Text,
	View,
	StyleSheet,
	FlatList,
	Image,
	Dimensions,
	Animated,
	TouchableOpacity,
	Platform
} from "react-native";
import { useFonts } from "expo-font";
import Loading from "../components/Loading";
import Backdrop from "../components/Backdrop";
import Rating from "../components/Rating";
import Genres from "../components/Genres";
import { SCREEN, SCREENS } from "../common/constants";
import { useGetMoviesQuery } from "../redux/api";
import { useDispatch } from "react-redux";
import { setMovieId } from "../redux/features/movie";

const { width, height } = SCREEN;
const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

function MovieList({ navigation }) {
	const [movies, setMovies] = React.useState([]);
	const scrollX = React.useRef(new Animated.Value(0)).current;
	const { data: fetchedMovies, isLoading } = useGetMoviesQuery();

	const dispatch = useDispatch();

	React.useEffect(() => {
		const fetchData = async () => {
			setMovies([
				{ key: "empty-left" },
				...fetchedMovies,
				{ key: "empty-right" }
			]);
		};

		if (movies.length === 0) {
			fetchData(movies);
		}
	}, [movies, fetchedMovies]);

	if (isLoading) {
		return <Loading />;
	}

	const goToMovieDetails = (movie) => {
		dispatch(setMovieId(movie.key));
		navigation.navigate(SCREENS.MovieDetail, { movie });
	};

	return (
		<View style={styles.container}>
			<Backdrop movies={movies} scrollX={scrollX} />
			<StatusBar hidden />
			<Animated.FlatList
				showsHorizontalScrollIndicator={false}
				data={movies}
				keyExtractor={(item) => item.key}
				horizontal
				bounces={false}
				decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
				renderToHardwareTextureAndroid
				contentContainerStyle={{ alignItems: "center" }}
				snapToInterval={ITEM_SIZE}
				snapToAlignment="start"
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
				scrollEventThrottle={16}
				renderItem={({ item, index }) => {
					if (!item.poster) {
						return <View style={{ width: EMPTY_ITEM_SIZE }} />;
					}

					const inputRange = [
						(index - 2) * ITEM_SIZE,
						(index - 1) * ITEM_SIZE,
						index * ITEM_SIZE
					];

					const translateY = scrollX.interpolate({
						inputRange,
						outputRange: [100, 50, 100],
						extrapolate: "clamp"
					});

					return (
						<View style={{ width: ITEM_SIZE }}>
							<Animated.View
								style={{
									marginHorizontal: SPACING,
									padding: SPACING * 2,
									alignItems: "center",
									transform: [{ translateY }],
									backgroundColor: "white",
									borderRadius: 34
								}}>
								<TouchableOpacity
									onPress={() => goToMovieDetails(item)}
									activeOpacity={0.8}>
									<View>
										<Image
											source={{ uri: item.poster }}
											style={styles.posterImage}
										/>
										<Text
											style={{ fontSize: 24, textAlign: "center" }}
											numberOfLines={1}>
											{item.title}
										</Text>
										<Rating rating={item.rating} />
										<Genres genres={item.genres} />
										<Text style={{ fontSize: 12 }} numberOfLines={3}>
											{item.description}
										</Text>
									</View>
								</TouchableOpacity>
							</Animated.View>
						</View>
					);
				}}
			/>
		</View>
	);
}

export default MovieList;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	posterImage: {
		width: "100%",
		height: ITEM_SIZE * 1.2,
		resizeMode: "cover",
		borderRadius: 24,
		margin: 0,
		marginBottom: 10
	}
});
