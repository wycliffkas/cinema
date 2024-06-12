import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Seat from './Seat';
import { getSeatColor } from '../common/utils';

const SeatRow = ({ position, seats }) => {
    const justifyContent = position === 'left' ? 'flex-end' : 'flex-start';

    return (
        <>
            {
                seats.map((item, index) => {
                    return (
                        <View style={{ flexDirection: 'row', gap: 10, justifyContent }} key={index}>
                            {
                                item.map((seat, i) => {
                                    const color = getSeatColor(seat.status);
                                    return (
                                        <Seat item={seat} key={i}/>
                                    )
                                })
                            }
                        </View>
                    )
                })
            }
        </>
    )
}

export default SeatRow

const styles = StyleSheet.create({})
