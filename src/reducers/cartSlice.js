import { createSlice } from "@reduxjs/toolkit";
import { fetchCartItems, addToCart, changeCartItemQuantity, removeFromCart } from "./cartReducers";
import { cartInitialState } from "./initialStates";
const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialState,
    reducers: {
        saveShippingAddress(state, { payload }) {
            state.shippingAddress = payload;
            sessionStorage.setItem("shippingAddress", JSON.stringify(payload))
        },
        savePaymentMethod(state, { payload }) {
            state.paymentMethod = payload;
            localStorage.setItem("paymentMethod", JSON.stringify(payload))
        },
        clearCart(state){
            state.cartItems = []
        }
    },
    extraReducers: {
        //fetchCartItems
        [fetchCartItems.pending.type]: ( state ) => {
            state.isLoading = true;
        },
        [fetchCartItems.fulfilled.type]: ( state, { payload }) => {
            if(payload.noUser) {
                state.isLoading = false;
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
            state.error = null
        },
        [addToCart.fulfilled.type]: ( state, { payload }) => {

            if(payload.noUser) {
                const { countInStock } = payload.item;
                const item = { _id: payload.item._id, quantity: payload.item.quantity };   
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
                state.cartItems = payload.cart.cartItems;    
            };
        },
        [addToCart.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
        //changeCartItemQuantity
        [changeCartItemQuantity.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null
        },
        [changeCartItemQuantity.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            const cartItems = [ ...state.cartItems ];
            const existingItem = cartItems.find(item => item._id === payload.item._id);
            existingItem.quantity = payload.item.quantity;
            state.cartItems = cartItems;

            if(payload.noUser) localStorage.setItem("cartItems", JSON.stringify(cartItems))
        },
        [changeCartItemQuantity.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
        //removeFromCart
        [removeFromCart.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null
        },
        [removeFromCart.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            const cartItems = state.cartItems.filter(item => item._id !== payload.id);
            state.cartItems = cartItems;
            if(payload.noUser) localStorage.setItem("cartItems", JSON.stringify(cartItems));
        },
        [removeFromCart.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;