import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const InfoIcon = ({ iconName, rating }) => {
    return (
        <View style={styles.wrapper}>
            <FontAwesome name={iconName} size={20} color="#868E96" />
            <Text style={styles.text}>{rating}</Text>
        </View>
    )
}

export default InfoIcon

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row', alignItems: 'center', gap: 4
    },
    text: {
        color: '#868E96', fontWeight: 'bold'
    }
})