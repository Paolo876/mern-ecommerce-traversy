import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk( 'productList/fetchProducts', async ( { keyword="", pageNumber = 1}, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        return res.data
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})

export const sortProducts = createAsyncThunk( 'productList/sortProducts', async ( { sortValue }, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/products/q?sort=${sortValue}`);
        return res.data
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})
export const fetchShowcase = createAsyncThunk( 'productList/fetchShowcase', async ( data, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/products/showcase`);
        return res.data
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})

//admin only
export const deleteProduct = createAsyncThunk( 'productList/deleteProduct', async ( id, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/admin/products/${id}`, { withCredentials: true });
        return res.data
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})

//admin only
export const createProduct = createAsyncThunk( 'productList/createProduct', async ( data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/admin/products`, data, { withCredentials: true });
        return res.data
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})

//admin only
export const updateProduct = createAsyncThunk( 'productList/updateProduct', async ( data, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/admin/products/${data._id}`, data, { withCredentials: true });
        return res.data
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})