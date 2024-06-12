// Create a react native dropdown picker
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { COLORS } from '../common/constants';
import { ScrollView } from 'react-native-gesture-handler';

export default function Dropdown({ listItems, defaultItem, pickerStyles = null, handlePress }) {
    const [showList, setShowList] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    useEffect(() => {
        setSelectedItem(defaultItem.label)
    }, [defaultItem])

    return (
        <>
            <TouchableOpacity
                style={styles.selectButton}
                activeOpacity={0.7}
                onPress={() => setShowList(!showList)}
            >
                <Text>{selectedItem}</Text>
                <Entypo name="chevron-small-down" size={24} color="black" />
            </TouchableOpacity>
            {showList && <View style={[styles.dropdownContainer, pickerStyles]}>
                <ScrollView style={{ width: '100%', height: '100%' }}>
                    {listItems.map((item, index) => {
                        return (
                            <>
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        handlePress(item)
                                        setSelectedItem(item.label)
                                        setShowList(false)
                                    }}
                                    style={[styles.dropdownItem,
                                    { backgroundColor: item.label === selectedItem ? COLORS.gray : 'white' }
                                    ]}
                                >
                                    <Text>{item.label}</Text>
                                </TouchableOpacity>
                                {index !== listItems.length - 1 && <View style={styles.divider}></View>}
                            </>
                        )
                    })}
                </ScrollView>
            </View>}
        </>
    )
}

const styles = StyleSheet.create({
    selectButton: {
        width: '100%',
        height: 40,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#C4C9DF',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        zIndex: -1
    },
    dropdownContainer: {
        position: 'absolute',
        top: 42,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#C4C9DF',
        elevation: 3,
        backgroundColor: 'white',
        maxHeight: 300
    },
    dropdownItem: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#C4C9DF'
    }
})
