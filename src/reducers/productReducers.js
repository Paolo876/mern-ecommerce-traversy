import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk( 'productList/fetchProducts', async ( productsData, { rejectWithValue }) => {
    try {
        const res = await axios.get('http://localhost:3001/api/products');
        return res.data
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})

//admin only
export const deleteProduct = createAsyncThunk( 'productList/deleteProduct', async ( id, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`http://localhost:3001/api/admin/products/${id}`, { withCredentials: true });
        return res.data
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})

//admin only
export const createProduct = createAsyncThunk( 'productList/createProduct', async ( data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`http://localhost:3001/api/admin/products`, data, { withCredentials: true });
        return res.data
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})