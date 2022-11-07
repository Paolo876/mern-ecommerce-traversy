import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import useUserRedux from "../hooks/useUserRedux";
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async ( id, { rejectWithValue }) => {
    try {
        if(id === "no_user") return "no_user";
        const res = await axios.get(`http://localhost:3001/api/cart/${id}`);
        return res.data.cartItems
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})

export const addToCart = createAsyncThunk( 'cart/addToCart', async ( item, { rejectWithValue, getState }) => {
  const { userData } = getState().user;
  if(userData) {
    //axios-post add to cart here
  } else {
    return { noUser: true, item } 
  }
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
        //fetchCartItems
        [fetchCartItems.pending.type]: ( state ) => {
            state.isLoading = true;
        },
        [fetchCartItems.fulfilled.type]: ( state, { payload }) => {
            if(payload === "no_user") {
                state.isLoading = false;
                state.cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
            } else {
                state.isLoading = false;
                state.cartItems = payload;    
            };
        },
        [fetchCartItems.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
        //addToCart
        [addToCart.pending.type]: ( state ) => {
            state.isLoading = true;
        },
        [addToCart.fulfilled.type]: ( state, { payload }) => {
            if(payload.noUser) {
                state.isLoading = false;
                const cartItems = [ ...state.cartItems ];
                const existingItem = cartItems.find(item => item._id === payload.item._id)
                //if item exists, add quantity.
                if(existingItem) {
                    existingItem.quantity = parseInt(existingItem.quantity) + parseInt(payload.item.quantity);
                } else {
                    cartItems.push(payload.item);
                }
                state.cartItems = cartItems;
                localStorage.setItem("cartItems", JSON.stringify(cartItems))
            } else {
                state.isLoading = false;
                state.cartItems = payload;    
            };
        },
        [addToCart.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;