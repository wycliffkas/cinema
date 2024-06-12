import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScaleItem from './ScaleItem'
import { COLORS } from '../common/constants'

const SeatScale = () => {
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '70%', alignSelf: 'center' }}>
                <ScaleItem title="Available" color={COLORS.gray} />
                <ScaleItem title="Booked" color={COLORS.black} />
                <ScaleItem title="Your Selection" color={COLORS.primaryShade} />
            </View>
        </View>
    )
}

export default SeatScale

const styles = StyleSheet.create({})