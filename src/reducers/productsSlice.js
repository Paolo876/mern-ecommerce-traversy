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

//admin only
export const deleteProduct = createAsyncThunk( 'productList/deleteProduct', async ( id, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`http://localhost:3001/api/admin/products/${id}`, { withCredentials: true });
        return res.data
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})

const productsSlice = createSlice({
    name: "productList",
    initialState: productsInitialState,
    reducers: {
        clearSuccess(state){
            state.success = null;
        }
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
        //deleteProduct (ADMIN)
        [deleteProduct.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteProduct.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            const { id, message } = payload;
            state.products = state.products.filter(item => item._id !== id);
            state.success = message;
        },
        [deleteProduct.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
    }
});

export const productsActions = productsSlice.actions;
export default productsSlice;