import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
    initialState: {
        products: [],
        isLoading: false,
        error: null
    },
    reducers: {
        // productListRequest({ isLoading }) {
        //     isLoading = true;
        // },
        // productListSuccess({ isLoading, products }, { payload }) {
        //     isLoading = false;
        //     products = payload
        // },
        // productListFail({ isLoading, error }, { payload }){
        //     isLoading = false;
        //     error = payload;
        // }
    },
    extraReducers: {
        //fetchProducts
        [fetchProducts.pending.type]: ( state ) => {
            state.isLoading = true;
        },
        [fetchProducts.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
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