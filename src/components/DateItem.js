import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const DateItem = ({ dateData, setWatchDate, movieId }) => {
    const { date, day, fullDate } = dateData

    const cinema = useSelector(state => state.cinema)
    const selectedDate = cinema[movieId]?.selectedDate

    const isDateSelected = (selectedDate === null || selectedDate === undefined) || selectedDate === date

    return (
        <TouchableOpacity
            style={[styles.dateItem, isDateSelected ? styles.dateItemActive : styles.dataItemUnactive]}
            onPress={() => setWatchDate(date, String(fullDate))}
            activeOpacity={0.5}
        >
            <Text
                style={[styles.dayText, { color: isDateSelected ? '#5C5C5C' : '#BDBDBD' }]}
            >{day.split(',')[0]}</Text>
            <Text
                style={[styles.dateText, { color: isDateSelected ? '#5C5C5C' : '#BDBDBD' }]}
            >{date}</Text>
        </TouchableOpacity>
    )
}

export default DateItem

const styles = StyleSheet.create({
    dateItemActive: {
        backgroundColor: '#fff',
        borderColor: '#0C4CA8',
    },
    dataItemUnactive: {
        backgroundColor: '#E5E5E5',
        borderColor: '#BDBDBD',
    },
    dateItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        borderWidth: 1,
        width: 80,
        height: 80,
        borderRadius: 10,
        gap: 6,
    },

    dayText: {
        fontSize: 12,
        textTransform: 'uppercase',
        color: '#5C5C5C',
        fontWeight: 'bold'
    },
    dateText: {
        fontSize: 20,
        fontWeight: 'bold'
    }

})