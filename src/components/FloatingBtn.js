// Create a circle action button with arrow icon on the right side of the screen backgroundColor should be #0C4CA8

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import RoundedBtn from './RoundedBtn';

const FloatingBtn = ({ bottomOffset, handlePress }) => {


  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(bottomOffset.value, [-62, 0], [1, 0])

    return { opacity }
  })

  return (
    <Animated.View style={[animatedStyle]}>
      <RoundedBtn handlePress={handlePress} isFloating />
    </Animated.View>
  )
}

export default FloatingBtn

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0C4CA8',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
