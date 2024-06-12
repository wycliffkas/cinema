import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../common/constants';

const RoundedBtn = ({ handlePress, isFloating = false }) => {

    const floatStyles = isFloating ? {
        position: 'absolute',
        bottom: 20,
        right: 20
    } : {}

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={handlePress}
        >
            <LinearGradient
                colors={COLORS.primaryGradient}
                style={[styles.btn, floatStyles]}
            >
                <AntDesign name="arrowright" size={24} color="white" />
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default RoundedBtn

const styles = StyleSheet.create({
    btn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0C4CA8',
        alignItems: 'center',
        justifyContent: 'center'
    }
})