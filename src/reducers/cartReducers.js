import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async ( id, { rejectWithValue, getState }) => {
    const { user:{ userData }, cart: { cartItems } } = getState();
    try {
        if(!userData) {
          return { noUser: true };
        } else {
          const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/cart?token=${cookies.get('token')}`, { withCredentials: true });
          const cartFromStorage = JSON.parse(localStorage.getItem("cartItems"))
          //push existing cartItems(from LS) to user's cart
          if(cartFromStorage) {
            const updatedCart = await axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/cart/add?token=${cookies.get('token')}`, { cartItems }, { withCredentials: true })  
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
  try {
    if(userData) {
      const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/cart/add?token=${cookies.get('token')}`, { cartItems: [item] }, { withCredentials: true })
      return { cart: res.data, noUser: false }
    } else {
      return { noUser: true, item } 
    }
  } catch (err){
    return rejectWithValue(err.response.data)
  }
})

export const changeCartItemQuantity = createAsyncThunk( 'cart/changeCartItemQuantity', async ( item, { rejectWithValue, getState } ) => {
  const { userData } = getState().user;
  try {
    if(userData) {
      const res = await axios.put(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/cart/change-quantity?token=${cookies.get('token')}`, { item }, { withCredentials: true })
      return { noUser: false, item: res.data } 
    } else {
      return { noUser: true, item } 
    }
  } catch (err){
    return rejectWithValue(err.response.data)
  }

})

export const removeFromCart = createAsyncThunk( 'cart/removeFromCart', async ( id, { rejectWithValue, getState } ) => {
    const { userData } = getState().user;
    try {
      if(userData) {
        const res = await axios.put(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/cart/remove-item?token=${cookies.get('token')}`, { id }, { withCredentials: true })
        return { noUser: false, id: res.data }
      } else {
        return { noUser: true, id } 
      }
    } catch (err){
      return rejectWithValue(err.response.data)
    }
})