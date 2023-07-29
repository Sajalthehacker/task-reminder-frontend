import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Reducers/Reducer";

const store = configureStore({
    reducer: {
        userReducer, // Make sure to include the userReducer here
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;
