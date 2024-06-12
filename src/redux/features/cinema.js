import { createSlice } from "@reduxjs/toolkit";
import { CINEMAS } from "../../common/constants";

const seats = {
    "booked": {
        // Pick random seats for CINEMAS.Metroplex and CINEMAS.Arena
        [CINEMAS.Acacia]: [ "D1", "D2", "D3", "H3", "K1", "B5", "B6", "C6", "C7", "D6", "D7", "E6", "E7", "G4", "G5", "H4", "H5", "I6", "I7", "J6", "J7", "D9", "D10", "E9", "E10", "I8", "I9"],
        [CINEMAS.Metroplex]: ["B3", "B4", "B5", "B6", "C5", "D8", "D9", "E8", "E9", "G2", "G3", "G6", "G7", "H4", "H5", "H6", "H7", "I4", "I5", "I6", "I7", "J4", "J5", "J6", "J7", "K4", "K5", "K6", "K7"],
        [CINEMAS.Arena]: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "B1", "B2", "B3", "B4", "B5", "D9", "D6", "D7", "E6", "E7", "E8", "E9", "F1", "F2", "F3", "F4", "G2", "G3", "G4", "G5", "G6", "G7", "H6", "H7", "I6", "I7", "J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "K1", "K2", "K3", "K4", "K5", "K6", "K7", "K8", "K9", "K10"]
    },
    "selected": {
        [CINEMAS.Acacia]: [],
        [CINEMAS.Metroplex]: [],
        [CINEMAS.Arena]: []
    }
}

const initialMoviObj = {
    title: null,
    poster: null,
    selectedCinema: null,
    selectedDate: null,
    selectedFullDate: null,
    selectedMovie: null,
    selectedTime: null,
    selectedSeats: seats,
    selectedTickets: [],
    selectedTicketPrice: '0',
    selectedTicketQuantity: null,
    selectedTicketId: null
}

const initialState = {}

const cinemaSlice = createSlice({
    name: 'cinema',
    initialState,
    reducers: {
        setSelectedCinema: (state, action) => {
            const { cinema, id } = action.payload
            state[id].selectedCinema = cinema
        },
        setSelectedDate: (state, action) => {
            const { date, id } = action.payload
            state[id].selectedDate = date
        },
        setSelectedMovie: (state, action) => {
            const { date, fullDate, id, poster, title } = action.payload
            if (!state[id]) {
                state[id] = initialMoviObj
            }
            state[id].selectedMovie = id
            state[id].selectedDate = date
            state[id].selectedFullDate = fullDate
            state[id].poster = poster
            state[id].title = title
        },
        setSelectedTime: (state, action) => {
            const { time, id, cinema } = action.payload
            if (!state[id]) {
                state[id] = initialMoviObj
            }
            state[id].selectedTime = time
            state[id].selectedCinema = !!cinema ? cinema : state[id].selectedCinema

        },
        setSelectedSeats: (state, action) => {
            const { seats, id } = action.payload
            state[id].selectedSeats.selected[state[id].selectedCinema] = seats
        },
        setBookedSeats: (state, action) => {
            const { seats, id } = action.payload
            state[id].selectedSeats.booked[state.selectedCinema] = seats
        },
        setSelectedTickets: (state, action) => {
            const { tickets, id } = action.payload
            state[id].selectedTickets = tickets
        },
        setSelectedTicketPrice: (state, action) => {
            const { price, id } = action.payload
            state[id].selectedTicketPrice = price
        },
        setSelectedTicketQuantity: (state, action) => {
            const { quantity, id } = action.payload
            state[id].selectedTicketQuantity = quantity
        },
        setSelectedTicketId: (state, action) => {
            const { ticketId, id } = action.payload
            state[id].selectedTicketId = ticketId
        },
        resetSelectedMovie: (state, action) => {
            const { id } = action.payload
            state[id] = initialMoviObj
        }
    }
})

export const {
    setSelectedCinema,
    setSelectedDate,
    setSelectedMovie,
    setSelectedTime,
    setSelectedSeats,
    setBookedSeats,
    setSelectedTickets,
    setSelectedTicketPrice,
    setSelectedTicketQuantity,
    setSelectedTicketId,
    resetSelectedMovie
} = cinemaSlice.actions
export default cinemaSlice.reducer
