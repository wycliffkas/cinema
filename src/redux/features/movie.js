import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    movieId: null,
    tickets: []
}

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setMovieId: (state, action) => {
            state.movieId = action.payload
        },
        setTickets: (state, action) => {
            const { ticket } = action.payload
            state.tickets.push(ticket)
        }
    }
})

export const { setMovieId, setTickets } = movieSlice.actions
export default movieSlice.reducer
