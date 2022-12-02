import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { cartActions } from "./cartSlice";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const createOrder = createAsyncThunk('order/createOrder', async ( data, { rejectWithValue, dispatch }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/orders?token=${cookies.get('token')}`, data , {            
            headers: {
                'Content-Type': 'application/json',  
            },
            withCredentials: true
        });
        dispatch(cartActions.clearCart())   //clear cart items
        return res.data
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})