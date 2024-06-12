import { View, Text, ImageBackground, ScrollView, StyleSheet, FlatList, Alert, Button, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BORDER_RADIUS, CINEMAS, SCREEN, SCREENS } from '../common/constants';
import Synopsis from '../components/Synopsis';
import { getDatesForNextTwoWeeks } from '../common/helpers';
import DateItem from '../components/DateItem';
import CinemaTimes from '../components/CinemaTimes';
import VideoComponent from '../components/VideoComponent';
import InfoIcon from '../components/InfoIcon';
import { useGetMovieCreditsQuery, useGetMovieDetailsQuery, useGetMovieVideosQuery } from '../redux/api';
import { setSelectedMovie } from '../redux/features/cinema';
import FloatingBtn from '../components/FloatingBtn';
import BookNow from '../components/BookNow';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import MovieBackdrop from '../components/MovieBackdrop';

const MovieDetail = ({ route, navigation }) => {

  const cinema = useSelector(state => state.cinema)
  const translateY = useSharedValue(0)
  const bottomOffset = useSharedValue(-62)

  const dispatch = useDispatch()

  const { movie } = route.params
  const { data: movieDetails } = useGetMovieDetailsQuery(movie.key)
  const { data: movieVideos } = useGetMovieVideosQuery(movie.key)
  const { data: movieCredits } = useGetMovieCreditsQuery(movie.key)

  const image = { uri: movie.poster }

  const title = movieDetails?.title
  const runtime = movieDetails?.runtime

  const setWatchDate = (date, fullDate) => {
    dispatch(setSelectedMovie({ date, fullDate, id: movie.key, poster: movie.poster, title }))
  }

  const handleScroll = useAnimatedScrollHandler((event) => {

    const {
      contentOffset,
      contentSize,
      layoutMeasurement
    } = event

    bottomOffset.value = contentOffset.y - (contentSize.height - layoutMeasurement.height)
    translateY.value = event.contentOffset.y
  })

  const segueToSeats = () => {
    if (cinema[movie.key]?.selectedCinema && cinema[movie.key]?.selectedDate) {
      navigation.navigate(SCREENS.MovieSeats, { movieDetails, brief: movie })
    } else {
      /// Use react-native-root-toast
      Alert.alert('Please select a date and time')
    }
  }

  return (
    <View style={{ flex: 1, }}>
      <MovieBackdrop navigation={navigation} translateY={translateY} image={image} />
      <Animated.ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={styles.movieDetail}>
          <VideoComponent videos={movieVideos} />
          <Text style={styles.movieTitle}>{title}</Text>
          <View style={styles.movieInfo}>
            <InfoIcon iconName='star-o' rating={movie.rating} />
            <InfoIcon iconName='clock-o' rating={`${runtime || ''} min`} />
            <InfoIcon iconName='film' rating='IMAX 3D' />
          </View>

          <Synopsis movieDetails={movieDetails} movieCredits={movieCredits} />
        </View>

        <FlatList
          data={getDatesForNextTwoWeeks()}
          style={{ paddingLeft: 10 }}
          renderItem={({ item }) => {
            return <DateItem dateData={item} movieId={movie.key} setWatchDate={setWatchDate} />
          }}
          keyExtractor={item => item.day}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 20, marginBottom: 20 }}
        />

        <CinemaTimes name={CINEMAS.Acacia} movieId={movie.key} />
        <CinemaTimes name={CINEMAS.Metroplex} movieId={movie.key} />
        <CinemaTimes name={CINEMAS.Arena} movieId={movie.key} />

        <View style={{
            width: SCREEN.width95,
            alignSelf: "center",
        }}>
          <BookNow title="Book Now" handlePress={segueToSeats} />
        </View>

      </Animated.ScrollView>
      <FloatingBtn bottomOffset={bottomOffset} handlePress={segueToSeats} />
    </View>
  )
}

export default MovieDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  bgImage: {
    height: SCREEN.height4,
    position: 'absolute',
    width: SCREEN.width,
  },
  whiteBg: {
    position: 'absolute',
    top: SCREEN.height4,
    width: SCREEN.width,
    height: '100%',
    backgroundColor: 'white',
  },
  movieDetail: {
    width: SCREEN.width9,
    backgroundColor: 'white',
    minHeight: SCREEN.height4,
    alignSelf: "center",
    marginTop: SCREEN.height1,
    borderRadius: BORDER_RADIUS.xLarge,
    borderColor: '#CCD2D8',
    borderWidth: 0.4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  movieInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '65%',
    alignSelf: 'center',
    marginBottom: 20
  }
});
