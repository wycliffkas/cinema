import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const InfoItem = ({ title, text }) => {
  return (
    <View>
      <View style={styles.infoWrapper}>
            <Text style={styles.heading}>{title}:</Text>
            <Text style={styles.text}>{text}</Text>
        </View>
    </View>
  )
}

export default InfoItem

const styles = StyleSheet.create({
    infoWrapper: {
        marginVertical: 5
    },
    heading: {
        fontSize: 12
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    },
})