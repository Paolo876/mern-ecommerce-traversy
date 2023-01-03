import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async ( id, { rejectWithValue, getState }) => {
    const { user:{ userData }, cart: { cartItems } } = getState();
    try {
        if(!userData) {
          return { noUser: true };
        } else {
          const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/cart`, { withCredentials: true });
          const cartFromStorage = JSON.parse(localStorage.getItem("cartItems"))
          if(cartFromStorage) {
            const updatedCart = await axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/cart/add`, { cartItems }, { withCredentials: true })  
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
      const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/cart/add`, { cartItems: [item] }, { withCredentials: true })
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
      const res = await axios.put(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/cart/change-quantity`, { item }, { withCredentials: true })
      console.log(res.data)
      return { noUser: false, item: res.data } 
    } else {
      return { noUser: true, item } 
    }
  } catch (err){
    console.log(err)
    return rejectWithValue(err.response.data)
  }

})

export const removeFromCart = createAsyncThunk( 'cart/removeFromCart', async ( id, { rejectWithValue, getState } ) => {
    const { userData } = getState().user;
    try {
      if(userData) {
        const res = await axios.put(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/cart/remove-item`, { id }, { withCredentials: true })
        return { noUser: false, id: res.data }
      } else {
        return { noUser: true, id } 
      }
    } catch (err){
      return rejectWithValue(err.response.data)
    }
})

export const fetchUserAddresses = createAsyncThunk( 'cart/fetchUserAddresses', async ( data, { rejectWithValue } ) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/users/address`, { withCredentials: true })
      return res.data
    } catch (err){
      return rejectWithValue(err.response.data || {message: "An error has occurred."})
    }
})

export const shipToNewAddress = createAsyncThunk( 'cart/shipToNewAddress', async ( data, { rejectWithValue } ) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/users/add-address`, data, {             
        headers: {
        'Content-Type': 'application/json',  
        },withCredentials: true})      
      return res.data
      
    } catch (err){
      return rejectWithValue(err.response.data || {message: "An error has occurred."})
    }
})