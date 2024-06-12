import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import RoundedBtn from './RoundedBtn'
import { SCREEN } from '../common/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTicketPrice } from '../redux/features/cinema'

const ActionFooter = ({ handlePress }) => {
    const cinema = useSelector(state => state.cinema)
    const { movieId } = useSelector(state => state.movie)
    const { selectedSeats, selectedCinema, selectedTicketPrice } = cinema[movieId]

    const dispatch = useDispatch()
    
    const seatNum = selectedSeats.selected[selectedCinema].length

    useEffect(() => {
        let amount = seatNum * 20000
        amount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        dispatch(setSelectedTicketPrice({price: amount, id: movieId}))
    }, [seatNum])

    return (
        <View style={styles.seatInfo}>
            <View style={styles.seatNumView}>
                <Image source={require('../../assets/ticket2.png')} style={{ height: 13, width: 20, resizeMode: 'contain', marginRight: 5 }} />
                <Text style={styles.seatNumText}>x{seatNum}</Text>
                <View style={styles.divider} />
                <View style={{ marginRight: 5 }}>
                    <Text style={{ fontSize: 12 }}>TOTAL</Text>
                    <Text style={{ fontSize: 12 }}>PAYABLE:</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 24, fontWeight: '500' }}>{selectedTicketPrice}</Text>
                    <Text style={{ paddingBottom: 3 }}>shs</Text>
                </View>
            </View>
            <RoundedBtn handlePress={handlePress} />
        </View>
    )
}

export default ActionFooter

const styles = StyleSheet.create({
    seatInfo: {
        width: SCREEN.width9,
        borderColor: '#C4C9DF',
        borderWidth: 0.4,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        height: 60,
        borderRadius: 30,
        paddingLeft: 20,
        justifyContent: 'space-between'
    },
    seatNumView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%'
    },
    seatNumText: {
        fontSize: 20,
        paddingBottom: 5,
        color: '#868E96'
    },
    divider: {
        borderLeftWidth: 1,
        borderLeftColor: '#C4C9DF',
        height: '60%',
        marginHorizontal: 20
    }
})