import { createSlice } from "@reduxjs/toolkit";
import { fetchCartItems, addToCart, changeCartItemQuantity } from "./cartReducers";
const cartInitialState = {
    cartItems: [],
    isLoading: false,
    error: null
}
const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialState,
    reducers: {
    },
    extraReducers: {
        //fetchCartItems
        [fetchCartItems.pending.type]: ( state ) => {
            state.isLoading = true;
        },
        [fetchCartItems.fulfilled.type]: ( state, { payload }) => {
            if(payload.noUser) {
                state.isLoading = false;
                state.cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
            } else {
                state.isLoading = false;
                state.cartItems = payload;    
            };
        },
        [fetchCartItems.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
        //addToCart
        [addToCart.pending.type]: ( state ) => {
            state.isLoading = true;
        },
        [addToCart.fulfilled.type]: ( state, { payload }) => {
            if(payload.noUser) {
                state.isLoading = false;
                const cartItems = [ ...state.cartItems ];
                const existingItem = cartItems.find(item => item._id === payload.item._id)
                //if item exists, add quantity.
                if(existingItem) {
                    const totalQuantity = parseInt(existingItem.quantity) + parseInt(payload.item.quantity);
                    if(totalQuantity > existingItem.countInStock) {
                        existingItem.quantity = existingItem.countInStock;
                    } else {
                        existingItem.quantity = totalQuantity;
                    }
                } else {
                    cartItems.push(payload.item);
                }
                state.cartItems = cartItems;
                localStorage.setItem("cartItems", JSON.stringify(cartItems))
            } else {
                state.isLoading = false;
                state.cartItems = payload;    
            };
        },
        [addToCart.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
        //changeCartItemQuantity
        [changeCartItemQuantity.pending.type]: ( state ) => {
            state.isLoading = true;
        },
        [changeCartItemQuantity.fulfilled.type]: ( state, { payload }) => {
            if(payload.noUser) {
                state.isLoading = false;
                const cartItems = [ ...state.cartItems ];
                const existingItem = cartItems.find(item => item._id === payload.item._id);
                existingItem.quantity = payload.item.quantity;
                state.cartItems = cartItems;
                localStorage.setItem("cartItems", JSON.stringify(cartItems))
            } else {
                state.isLoading = false;
                state.cartItems = payload;    
            };
        },
        [changeCartItemQuantity.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;