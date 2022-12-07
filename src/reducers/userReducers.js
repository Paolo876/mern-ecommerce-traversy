import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartActions } from "./cartSlice";
// import { googleLogout } from '@react-oauth/google';
// import { loadAuth2, loadGapiInsideDOM  } from 'gapi-script';
import useGapi from "../hooks/useGapi";
import axios from "axios";

// login
export const login = createAsyncThunk( 'user/login', async ( payload, { rejectWithValue }) => {
    try {
        const { email, password } = payload;
        console.log(payload);
        const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/users/login`, { email, password }, 
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
        
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/users/authorize`, 
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
        const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/users/register`, payload , 
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

// updateProfile
export const updateProfile = createAsyncThunk( 'user/updateProfile', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/users/update`, payload , 
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
export const logout = createAsyncThunk( 'user/logout', async ( id, { rejectWithValue, dispatch }) => {
    // const { signOut } = useGapi();
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/users/logout`, { withCredentials: true});
        // signOut()
        dispatch(cartActions.clearCart())   //clear cart items
        return res.data
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})
