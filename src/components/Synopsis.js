import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

function Synopsis(props) {
    const [numOfLines, setNumOfLines] = useState(3)
    const [showMore, setShowMore] = useState(false)
    const { movieDetails, movieCredits } = props
    const overview = movieDetails?.overview
    const genres = movieDetails?.genres
    const homepage = movieDetails?.homepage

    useEffect(() => {
        if (showMore) {
            setNumOfLines(0)
        } else {
            setNumOfLines(3)
        }
    }, [showMore])


    return (
        <View style={{ borderTopWidth: 1, borderTopColor: '#C4C9DF', marginHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', marginTop: 10, marginBottom: 10 }} >Synopsis</Text>
            <View style={{ flexDirection: 'row', flexWrap: "wrap", alignSelf: 'center', justifyContent: 'center', gap: 4, marginBottom: 10 }}>{
                genres && genres.map(genre => (
                    <Text key={genre.name} style={{ backgroundColor: 'rgba(134, 142, 150, 0.1)', color: '#868E96', fontWeight: 'bold', minWidth: 4, borderRadius: 15, paddingHorizontal: 10, paddingVertical: 4 }} >{genre.name}</Text>
                ))
            }</View>
            <Text
                numberOfLines={numOfLines}
                style={{
                    marginBottom: 15,
                    color: '#868E96',
                    textAlign: 'justify'
                }}>{overview}</Text>

            {showMore && <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', marginTop: 10, marginBottom: 10 }}>Main Cast</Text>
                <FlatList
                    data={movieCredits}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                       return (
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
                            <View style={{ width: 80, height: 80, borderRadius: 40, overflow: 'hidden' }}>
                                <Image
                                    source={{ uri: item.profilePath }}
                                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                />
                            </View>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginTop: 5 }}>{item.name}</Text>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>{item.character}</Text>
                        </View>
                    )}}
                />

            </View>}
            <TouchableOpacity
                onPress={() => setShowMore(!showMore)}
                style={{ width: '60%', backgroundColor: '#F2F3F4', justifyContent: 'center', alignItems: 'center', borderRadius: 50, alignSelf: 'center', marginBottom: 20 }}>
                <FontAwesome
                    name={!showMore ? "angle-down" : "angle-up"}
                    size={24}
                    color="#868E96"
                />
            </TouchableOpacity>
        </View>)
}

export default Synopsis