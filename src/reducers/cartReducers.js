import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async ( id, { rejectWithValue, getState }) => {
    const { user:{ userData }, cart: { cartItems } } = getState();
    try {
        if(!userData) {
          return { noUser: true };
        } else {
          const res = await axios.get(`http://localhost:3001/api/cart`, { withCredentials: true });
          const cartFromStorage = JSON.parse(localStorage.getItem("cartItems"))
          //push existing cartItems(from LS) to user's cart
          if(cartFromStorage) {
            const updatedCart = await axios.post("http://localhost:3001/api/cart/add", { cartItems }, { withCredentials: true })  
            localStorage.removeItem("cartItems")   //remove items from storage
            return [ ...updatedCart.data.cartItems ]
          } else {
            return res.data.cartItems
          }
        }
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