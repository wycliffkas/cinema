import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BORDER_RADIUS, COLORS, SCREEN, SPACING } from '../common/constants'
import { LinearGradient } from 'expo-linear-gradient'

const BookNow = ({ handlePress, title }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            style={{
                width: '100%',
                alignSelf: "center",
                marginBottom: 20,
                borderRadius: BORDER_RADIUS.medium,
                backgroundColor: COLORS.primary,
            }}
        >
            <Text style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 20,
                padding: SPACING,
            }}>{title}</Text>

        </TouchableOpacity>
    )
}

export default BookNow