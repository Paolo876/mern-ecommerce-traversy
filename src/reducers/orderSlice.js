import { createSlice } from "@reduxjs/toolkit";
import { orderInitialState } from "./initialStates";
import { createOrder } from "./orderReducers";
const orderSlice = createSlice({
    name: "order",
    initialState: orderInitialState,
    reducers: {

    },
    extraReducers: {
        //createOrder
        [createOrder.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
            state.createdOrder = null;

        },
        [createOrder.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.createdOrder = payload;
            state.orders = [...state.orders, payload]
        },
        [createOrder.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
            state.createdOrder = null;
        },
    }
});

export const orderActions = orderSlice.actions;
export default orderSlice;