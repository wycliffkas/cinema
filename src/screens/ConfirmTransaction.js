import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, SCREEN, SCREENS } from '../common/constants'
import { useDispatch, useSelector } from 'react-redux'
import BookNow from '../components/BookNow'
import { setTickets } from '../redux/features/movie'
import { CommonActions } from '@react-navigation/native'

const ListItem = ({ title, value }) => {
    return (
        <View style={[styles.listItem, styles.borderBottom]}>
            <Text style={{ fontSize: 16 }}>{title}</Text>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{value}</Text>
        </View>
    )
}

const ConfirmTransaction = ({ navigation }) => {

    const cinema = useSelector(state => state.cinema)
    const { movieId } = useSelector(state => state.movie)
    const { selectedTicketPrice } = cinema[movieId]
    const dispatch = useDispatch()

    const bookTicket = () => {

        const movieData = {
            id: movieId,
            ...cinema[movieId]
        }        
        
        dispatch(setTickets({ ticket: movieData }))

        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: SCREENS.MovieCarousel },
                    {
                        name: SCREENS.Ticket,
                        params: {
                            ticketId: cinema[movieId].selectedTicketId
                        }
                    }
                ]
            })
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Paying UGX {selectedTicketPrice}</Text>
                <View style={{ marginTop: 20 }}>
                    <ListItem title="Payment Method" value="Mobile Money" />
                    <ListItem title="Mobile Number" value="0789 123 456" />
                    <ListItem title="Mobile Carrier" value="MTN" />
                    <ListItem title="Amount" value={`UGX ${selectedTicketPrice}`} />
                    <View style={styles.listItem}>
                        <Text style={{ fontSize: 16, color: COLORS.primary }}>You Pay</Text>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.primary }}>{`UGX ${selectedTicketPrice}`}</Text>
                    </View>
                </View>
            </View>
            <View style={{
                width: SCREEN.width9,
                alignSelf: 'center',
            }}>
                <BookNow title="Confirm" handlePress={bookTicket} />
            </View>
        </View>
    )
}

export default ConfirmTransaction

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    content: {
        width: SCREEN.width9,
        alignSelf: 'center',
        marginTop: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    borderBottom: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#888'
    }
})