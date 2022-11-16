import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk('order/createOrder', async ( data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`http://localhost:3001/api/orders`, { withCredentials: true });
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})