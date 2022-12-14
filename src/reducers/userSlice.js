import { createSlice } from "@reduxjs/toolkit";
import { login, logout, authorizeToken, register, updateProfile } from "./userReducers";
import { userInitialState } from "./initialStates";

const userSlice = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {
        setUserData(state, { payload }){
            state.isLoading = false;
            state.userData = payload;
            state.error = null;
            state.success = false;
        },
        setIsLoading(state, { payload }){
            state.isLoading = payload;
            state.error = null;
            state.success = false;
        },
        setError(state, { payload }){
            state.isLoading = false;
            state.error = payload.message;
            state.success = false;
        }
    }, 
    extraReducers: {
        //login
        [login.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
            state.success = false;
        },
        [login.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.userData = payload;
            state.error = null;
            state.success = false;
        },
        [login.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
            state.success = false;
        },
        //logout
        [logout.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
            state.success = false;
        },
        [logout.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.userData = null;
            state.success = false;
            localStorage.removeItem("cartItems") //clear cartItems in localStorage

        },
        [logout.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
            state.success = false;
        },
        //authorizeToken
        [authorizeToken.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
            state.success = false;
        },
        [authorizeToken.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.userData = payload;
            state.isAuthReady = true;
        },
        [authorizeToken.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.success = false;
            state.isAuthReady = true;
            // state.error = payload.message;
        },
        //register
        [register.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
            state.success = false;
        },
        [register.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.userData = payload;
        },
        [register.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
            state.success = false;
        },
        //updateProfile
        [updateProfile.pending.type]: ( state ) => {
            state.isLoading = true;
            state.success = false;
            state.error = null;
        },
        [updateProfile.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.userData = payload;
            state.success = true;
        },
        [updateProfile.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
            state.success = false;
        },
    }
});

export const userActions = userSlice.actions;
export default userSlice;