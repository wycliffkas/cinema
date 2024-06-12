import { Dimensions, Platform } from 'react-native'
const { width, height } = Dimensions.get('window');

export const SCREENS = {
    MovieCarousel: "MovieCarousel",
    MovieDetail: "MovieDetail",
    MovieSeats: "MovieSeats",
    PaymentScreen: "PaymentScreen",
    ConfirmTransaction: "ConfirmTransaction",
    Tickets: "Tickets",
    Ticket: "Ticket"
}

export const SCREEN = {
    width,
    height,
    width95: width * 0.95,
    width9: width * 0.9,
    width8: width * 0.8,
    width7: width * 0.7,
    width6: width * 0.6,
    width5: width * 0.5,
    width4: width * 0.4,
    width3: width * 0.3,
    width2: width * 0.2,
    width1: width * 0.1,
    height9: height * 0.9,
    height8: height * 0.8,
    height7: height * 0.7,
    height6: height * 0.6,
    height5: height * 0.5,
    height4: height * 0.4,
    height3: height * 0.3,
    height2: height * 0.2,
    height1: height * 0.1,
}
export const FONT_SIZE = {}
export const COLOR = {}
export const BORDER_RADIUS = {
    small: 5,
    medium: 10,
    large: 15,
    xLarge: 20,
    xxLarge: 25,
    xxxLarge: 30
}

export const SPACING = 10;
export const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
export const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
export const BACKDROP_HEIGHT = height * 0.65;

export const CINEMAS = {
    Acacia: "Acacia Mall",
    Metroplex: "Metroplex Naalya",
    Arena: "Arena Mall"
}

export const COLORS = {
    primary: '#0C4CA8',
    secondary: '',
    tertiary: '',
    black: '#212224',
    white: '#FFFFFF',
    gray: '#E7E8E9',
    primaryGradient: ['#0C4CA8', '#3062EF'],
    primaryShade: '#3062EF'
}
