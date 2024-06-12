import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ScaleItem = ({ title, color }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={[styles.scaleCirlce, { backgroundColor: color }]} />
            <Text style={styles.scaleText}>{title}</Text>
        </View>
    )
}

export default ScaleItem

const styles = StyleSheet.create({
    scaleCirlce: {
        width: 10, height: 10, marginRight: 5, borderRadius: 5
    },
    scaleText: {
        fontSize: 12,
        color: '#868E96'
    }
})