import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async ( id, { rejectWithValue, getState }) => {
    const { userData } = getState().user;
    try {
        if(!userData) return { noUser: true };
        const res = await axios.get(`http://localhost:3001/api/cart/${id}`);
        return res.data.cartItems
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})

export const addToCart = createAsyncThunk( 'cart/addToCart', async ( item, { rejectWithValue, getState } ) => {
  const { userData } = getState().user;
  if(userData) {
    //axios-post add to cart here
  } else {
    return { noUser: true, item } 
  }
})

export const changeCartItemQuantity = createAsyncThunk( 'cart/changeCartItemQuantity', async ( item, { rejectWithValue, getState } ) => {
  const { userData } = getState().user;
  if(userData) {
    //axios-post changeCartItemQuantity here
  } else {
    return { noUser: true, item } 
  }
})

export const removeFromCart = createAsyncThunk( 'cart/removeFromCart', async ( id, { rejectWithValue, getState } ) => {
    const { userData } = getState().user;
    if(userData) {
      //axios-post removeFromCart here
    } else {
      return { noUser: true, id } 
    }
})