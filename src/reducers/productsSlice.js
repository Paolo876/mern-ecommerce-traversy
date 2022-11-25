import { createSlice } from "@reduxjs/toolkit";
import { productsInitialState } from "./initialStates";
import { fetchProducts, deleteProduct, createProduct } from "./productReducers";

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
        //deleteProduct (ADMIN)
        [deleteProduct.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteProduct.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.products = [ ...state.products, payload ];
            state.success = "";
        },
        [deleteProduct.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
    }
});

export const productsActions = productsSlice.actions;
export default productsSlice;