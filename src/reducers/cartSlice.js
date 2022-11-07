import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async ( id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`http://localhost:3001/api/cart/${id}`);
        return res.data.cartItems
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})

export const addToCart = createAsyncThunk(() => {
  
})

const cartInitialState = {
    cartItems: [],
    isLoading: false,
    error: null
}
const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialState,
    reducers: {
        addItem( state, { payload }){
            //check if item already exist
            const existingItem = state.cartItems.find(item => item._id === payload._id);
            if(existingItem){
                // state.cartItems = [ ...state.cartItems, payload ]
                existingItem.quantity += payload.quantity
            } else {
                state.cartItems = [ ...state.cartItems, payload ]
            }
        },
    },
    extraReducers: {
        [fetchCartItems.pending.type]: ( state ) => {
            state.isLoading = true;
        },
        [fetchCartItems.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.cartItems = payload
        },
        [fetchCartItems.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;