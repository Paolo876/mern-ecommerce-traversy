import { configureStore } from '@reduxjs/toolkit'; 
import productsSlice from '../reducers/productsSlice';
import cartSlice from '../reducers/cartSlice';
import userSlice from '../reducers/userSlice';
const store = configureStore({
    reducer: {  
        productList: productsSlice.reducer,
        cart: cartSlice.reducer,
        user: userSlice.reducer
        // background: backgroundSlice.reducer,
        // todos: todoSlice.reducer, 
        // user: userSlice.reducer, 
        // settings: settingsSlice.reducer, 
        // bookmarks: bookmarksSlice.reducer
    }
});

export default store;