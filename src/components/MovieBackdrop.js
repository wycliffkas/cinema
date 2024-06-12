import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { SCREEN } from '../common/constants'
import BackButton from './BackButton'
import Gradient from './Gradient'

const MovieBackdrop = ({ navigation, translateY, image }) => {    

    return (
        <>
            <BackButton navigation={navigation} translateY={translateY} />
            <ImageBackground source={image} resizeMode='cover' style={styles.bgImage}>
                <Gradient />
            </ImageBackground>
            <View style={styles.whiteBg} />
        </>
    )
}

export default MovieBackdrop

const styles = StyleSheet.create({
    bgImage: {
        height: SCREEN.height4,
        position: 'absolute',
        width: SCREEN.width,
    },
    whiteBg: {
        position: 'absolute',
        top: SCREEN.height4,
        width: SCREEN.width,
        height: '100%',
        backgroundColor: 'white',
    }
})
