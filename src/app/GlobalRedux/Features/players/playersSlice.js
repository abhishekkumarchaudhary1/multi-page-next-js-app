'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        name: "Sachin Tendulkar",
        runs: 12000,
        age: 30
    },
    {
        name: "Saurav Gaungly",
        runs: 11000,
        age: 28
    },
    {
        name: "Virat Kohli",
        runs: 10000,
        age: 26
    }
]

export const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        addRuns: (state, action) => {
            state.runs += action.payload
        }
    }
})

export const { addRuns } = playersSlice.actions;

export default playersSlice.reducer;

