import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        isLoading: false,
        error: null
    },
    reducers: {

    },
});

export const userActions = userSlice.actions;
export default userSlice;