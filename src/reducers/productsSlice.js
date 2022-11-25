import { createSlice } from "@reduxjs/toolkit";
import { productsInitialState } from "./initialStates";
import { fetchProducts, deleteProduct, createProduct, updateProduct } from "./productReducers";

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
        //createProduct (ADMIN)
        [createProduct.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
        },
        [createProduct.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.products = [ ...state.products, payload ];
        },
        [createProduct.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
        //updateProduct (ADMIN)
        [updateProduct.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
        },
        [updateProduct.fulfilled.type]: ( state, { payload }) => {
            const { message, product } = payload;
            state.isLoading = false;
            state.error = null;
            state.success = message;
            const updatedProducts = state.products.map(item => {
                if(item._id === product._id) return product;
                return item;
            })
            state.products = updatedProducts
        },
        [updateProduct.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
    }
});

export const productsActions = productsSlice.actions;
export default productsSlice;