import { createSlice } from "@reduxjs/toolkit";
import { fetchCartItems, addToCart, changeCartItemQuantity, removeFromCart } from "./cartReducers";
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
                state.cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
                state.error = null;
            } else {
                state.isLoading = false;
                state.cartItems = payload;
                state.error = null;
            };
        },
        [fetchCartItems.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
        //addToCart (only save the id of the item)
        [addToCart.pending.type]: ( state ) => {
            state.isLoading = true;
        },
        [addToCart.fulfilled.type]: ( state, { payload }) => {
            const { countInStock } = payload.item;
            const item = { _id: payload.item._id, quantity: payload.item.quantity };

            if(payload.noUser) {
                state.isLoading = false;
                state.error = null;
                const cartItems = [ ...state.cartItems ];
                const existingItem = cartItems.find(item => item._id === payload.item._id)

                //if item exists, add quantity.
                if(existingItem) {
                    const totalQuantity = parseInt(existingItem.quantity) + parseInt(item.quantity);
                    if(totalQuantity > countInStock) {
                        existingItem.quantity = countInStock;   //if quantity is greater, set it equal to countInStock value.
                    } else {
                        existingItem.quantity = totalQuantity;
                    }
                } else {
                    cartItems.push(item);
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
            state.isLoading = false;
            state.error = null;
            if(payload.noUser) {
                const cartItems = [ ...state.cartItems ];
                const existingItem = cartItems.find(item => item._id === payload.item._id);
                existingItem.quantity = payload.item.quantity;
                state.cartItems = cartItems;
                localStorage.setItem("cartItems", JSON.stringify(cartItems))
            } else {
                state.cartItems = payload;    
            };
        },
        [changeCartItemQuantity.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
        //removeFromCart
        [removeFromCart.pending.type]: ( state ) => {
            state.isLoading = true;
        },
        [removeFromCart.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            if(payload.noUser) {
                const cartItems = state.cartItems.filter(item => item._id !== payload.id);
                state.cartItems = cartItems;
                localStorage.setItem("cartItems", JSON.stringify(cartItems))
            } else {
                state.cartItems = payload;    
            };
        },
        [removeFromCart.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;