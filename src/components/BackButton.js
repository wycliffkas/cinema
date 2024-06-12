import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor, interpolate } from 'react-native-reanimated'
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const BackButton = ({ navigation, translateY }) => {

    const animatedStyles = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(translateY.value, [0, 60], ['transparent', '#fff'])
        let top = interpolate(translateY.value, [0, 60], [30, 0])
        
        if(top < 0) top = 0
        
        return { backgroundColor, top }
    }, []);

    return (
        <Animated.View style={[styles.header, animatedStyles]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={26} color="black" />
            </TouchableOpacity>
        </Animated.View>
    )
}

export default BackButton

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        paddingLeft: 20,
        zIndex: 1,
        width: '100%',
        paddingVertical: 10
    }
})
