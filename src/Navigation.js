import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MovieDetail from './screens/MovieDetail';
import MovieList from './screens/MovieList';
import MovieSeats from './screens/MovieSeats';
import PaymentScreen from './screens/PaymentScreen';
import ConfirmTransaction from './screens/ConfirmTransaction';
import { SCREENS } from './common/constants';
import Tickets from './screens/Tickets';
import Profile from './screens/Profile';
import Ticket from './screens/Ticket';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TicketStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={SCREENS.Tickets} component={Tickets} options={{ headerShown: true }} />
            <Stack.Screen name={SCREENS.Ticket} component={Ticket} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={MovieList}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tickets"
                component={TicketStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Tickets',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="ticket" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const Home = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={SCREENS.MovieCarousel} component={Tabs} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name={SCREENS.MovieDetail} component={MovieDetail} options={{
                headerShown: false,
                animation: 'none'
            }} />
            <Stack.Screen name={SCREENS.MovieSeats} component={MovieSeats} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name={SCREENS.PaymentScreen} component={PaymentScreen} options={{ title: 'Select Payment Method' }} />
            <Stack.Screen name={SCREENS.ConfirmTransaction} component={ConfirmTransaction} options={{ title: 'Confirm transaction' }} />
            <Stack.Screen name={SCREENS.Ticket} component={Ticket} />
        </Stack.Navigator>
    )
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <Home />
        </NavigationContainer>
    )
}


export default Navigation