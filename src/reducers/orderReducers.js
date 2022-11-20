import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk('order/createOrder', async ( data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`http://localhost:3001/api/orders`, data , {            
            headers: {
                'Content-Type': 'application/json',  
            },
            withCredentials: true
        });
        return res.data
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})