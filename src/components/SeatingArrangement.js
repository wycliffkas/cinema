import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { seats } from '../common/seats'
import SeatScale from './SeatScale'
import SeatRow from './SeatRow'

const SeatingArrangement = () => {

    return (
        <View>
            <SeatScale />
            <View style={{ marginTop: 20 }}>
                <ImageBackground source={require('../../assets/screen.png')} style={{ alignSelf: 'center', width: '100%', height: 200 }} resizeMode='contain'>
                    <View style={{ marginTop: 80, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                        <View style={{ gap: 8 }}>
                            <SeatRow position='left' seats={seats.left1} />
                            <View style={{ height: 16 }} />
                            <SeatRow position='left' seats={seats.left2} />
                            <View style={{ height: 5 }} />
                            <SeatRow position='left' seats={seats.left3} />
                        </View>


                        <View style={{ gap: 8 }}>
                            <SeatRow position='center' seats={seats.middle1} />
                            <View style={{ height: 5 }} />
                            <SeatRow position='center' seats={seats.middle2} />
                        </View>

                        
                        <View style={{ gap: 8 }}>
                            <SeatRow position='right' seats={seats.right1} />
                            <View style={{ height: 16 }} />
                            <SeatRow position='right' seats={seats.right2} />
                            <View style={{ height: 5 }} />
                            <SeatRow position='right' seats={seats.right3} />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View>
    )
}

export default SeatingArrangement

const styles = StyleSheet.create({


})