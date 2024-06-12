import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../common/constants'
import { useDispatch, useSelector } from 'react-redux'
import { getSeatColor } from '../common/utils'
import { setSelectedSeats } from '../redux/features/cinema'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Seat = ({ item }) => {
    const [status, setStatus] = useState('available')
    const [color, setColor] = useState(COLORS.primary)

    const cinema = useSelector(state => state.cinema)
    const { movieId } = useSelector(state => state.movie)
    const { selectedSeats, selectedCinema } = cinema[movieId]

    const dispatch = useDispatch()

    useEffect(() => {
        const isBooked = selectedSeats.booked[selectedCinema].includes(item.value)
        const isSelected = selectedSeats.selected[selectedCinema].includes(item.value)
        const status = isBooked ? 'booked' : isSelected ? 'selected' : 'available'
        const color = getSeatColor(status)

        setStatus(status)
        setColor(color)
    }, [selectedSeats, selectedCinema])

    const handlePress = () => {
        if (status === 'booked') {
            alert('This seat is already booked')
            return;
        }

        if (status === 'selected') {
            const currentSelectedSeats = selectedSeats.selected[selectedCinema].filter(seat => seat !== item.value)
            dispatch(setSelectedSeats({ seats: currentSelectedSeats, id: movieId }))
        } else {
            const allSelectedSeats = [...selectedSeats.selected[selectedCinema], item.value]
            dispatch(setSelectedSeats({ seats: allSelectedSeats, id: movieId }))
        }

    }

    if (status === 'selected') {
        return (
            <TouchableOpacity onPress={handlePress} activeOpacity={0.4}>
                <View style={styles.seat}>
                    <LinearGradient colors={COLORS.primaryGradient} style={{ height: '100%', width: '100%' }}>
                        <Text style={styles.text}>{item.value}</Text>
                    </LinearGradient>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={status === 'booked' ? 1 : 0.4}
        >
            <View style={[styles.seat, { backgroundColor: color }]}>
                {status === 'available' && <Text style={styles.text}>{item.value}</Text>}
            </View>
        </TouchableOpacity>
    )
}

export default Seat

const styles = StyleSheet.create({
    seat: {
        width: 20,
        height: 16,
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        overflow: 'hidden'
    },
    text: {
        color: 'white',
        fontSize: 10,
        textAlign: 'center',
        marginTop: 1
    }
})