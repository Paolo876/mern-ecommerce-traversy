import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./userReducers";
const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        isLoading: false,
        error: null
    },
    reducers: {

    }, extraReducers: {
        //login
        [login.pending.type]: ( state ) => {
            state.isLoading = true;
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
    }
});

export const userActions = userSlice.actions;
export default userSlice;