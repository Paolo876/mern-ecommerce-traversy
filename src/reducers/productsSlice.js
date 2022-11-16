import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productsInitialState } from "./initialStates";

export const fetchProducts = createAsyncThunk( 'productList/fetchProducts', async ( productsData, { rejectWithValue }) => {
    try {
        const res = await axios.get('http://localhost:3001/api/products');
        return res.data
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})

const productsSlice = createSlice({
    name: "productList",
    initialState: productsInitialState,
    reducers: {
    },
    extraReducers: {
        //fetchProducts
        [fetchProducts.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
        },
        [fetchProducts.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.products = payload
        },
        [fetchProducts.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
    }
});

export const productsActions = productsSlice.actions;
export default productsSlice;