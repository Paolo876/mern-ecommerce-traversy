import { configureStore } from '@reduxjs/toolkit'; 
import productsSlice from '../reducers/productsSlice';
import cartSlice from '../reducers/cartSlice';
import userSlice from '../reducers/userSlice';
import orderSlice from '../reducers/orderSlice';
const store = configureStore({
    reducer: {  
        productList: productsSlice.reducer,
        cart: cartSlice.reducer,
        user: userSlice.reducer,
        order: orderSlice.reducer,
    }
});

export default store;