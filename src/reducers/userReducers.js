import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// login
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

// authorize -runs on initial load
export const authorizeToken = createAsyncThunk( 'user/authorizeToken', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.get('http://localhost:3001/api/users/authorize', 
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

// register
export const register = createAsyncThunk( 'user/register', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.post('http://localhost:3001/api/users/register', payload , 
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

//logout --clear cookies
export const logout = createAsyncThunk( 'user/logout', async ( id, { rejectWithValue }) => {
    try {
        const res = await axios.get('http://localhost:3001/api/users/logout', { withCredentials: true});
        return res.data
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})
