'use client';

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './Features/counter/counterSlice';
import playersReducer from './Features/players/playersSlice'

export const store = configureStore({
    reducer: {
        superman: counterReducer,
        batman: playersReducer
    },
});
