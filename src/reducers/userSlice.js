import { createSlice } from "@reduxjs/toolkit";
import { login, logout, authorizeToken, register } from "./userReducers";
const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        isLoading: false,
        error: null,
        isAuthReady: false
    },
    reducers: {

    }, extraReducers: {
        //login
        [login.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
        },
        [login.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.userData = payload;
            state.error = null;
        },
        [login.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
        //logout
        [logout.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
        },
        [logout.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.userData = null;
            localStorage.removeItem("cartItems") //clear cartItems in localStorage

        },
        [logout.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
        //authorizeToken
        [authorizeToken.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
        },
        [authorizeToken.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.userData = payload;
        },
        [authorizeToken.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            // state.error = payload.message;
        },
        //register
        [register.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
        },
        [register.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.userData = payload;
        },
        [register.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
    }
});

export const userActions = userSlice.actions;
export default userSlice;