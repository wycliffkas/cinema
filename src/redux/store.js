import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import cinemaReducer from "./features/cinema";
import movieReducer from "./features/movie";

const middlewares = [];
  
if (__DEV__) {
    const createDebugger = require("redux-flipper").default;
    middlewares.push(createDebugger());
}
  

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        cinema: cinemaReducer,
        movie: movieReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, middlewares)
})

export default store;