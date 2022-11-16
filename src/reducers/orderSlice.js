import { createSlice } from "@reduxjs/toolkit";
import { orderInitialState } from "./initialStates"
const orderSlice = createSlice({
    name: "cart",
    initialState: orderInitialState,
    reducers: {

    },
    extraReducers: {

    }
});

export const orderActions = orderSlice.actions;
export default orderSlice;