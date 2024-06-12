import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import ShowingTime from './ShowingTime'
import { useDispatch } from 'react-redux'
import { setSelectedTime } from '../redux/features/cinema'
import { showingTimes } from '../common/time'

const CinemaTimes = ({ name, movieId }) => {

    const dispatch = useDispatch()
    const flatListRef = useRef(null)

    const setWatchTime = (time) => {
        dispatch(setSelectedTime({
            time,
            cinema: name,
            id: movieId
        }))
    }

    return (
        <>
            <Text style={styles.cinemaName}>{name}</Text>
            <FlatList
                ref={flatListRef}
                style={{ marginLeft: 15 }}
                data={showingTimes}
                renderItem={({ item }) => <ShowingTime showingTime={item} setWatchTime={setWatchTime} cinemaName={name} movieId={movieId} />}
                keyExtractor={item => item.time}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ marginBottom: 20 }}
            />
        </>
    )
}

export default CinemaTimes

const styles = StyleSheet.create({
    cinemaName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 10
    }
})