import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk( 'user/login', async ( payload, { rejectWithValue }) => {
    try {
        const { email, password } = payload;
        const res = await axios.post('http://localhost:3001/api/users/login', { email, password }, 
        {
            headers: {
                'Content-Type': 'application/json',  
            },
            withCredentials: true,

        });
        return res.data
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})

export const logout = createAsyncThunk( 'user/logout', async ( userData, { rejectWithValue }) => {
    try {
        const res = await axios.get('http://localhost:3001/api/users/logout');
        return res.data.slice(0,4)
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})
