import { configureStore } from '@reduxjs/toolkit'; 
import productsSlice from '../reducers/productsSlice';

const store = configureStore({
    reducer: {  
        productList: productsSlice.reducer
                // background: backgroundSlice.reducer,
                // todos: todoSlice.reducer, 
                // user: userSlice.reducer, 
                // settings: settingsSlice.reducer, 
                // bookmarks: bookmarksSlice.reducer
            }
});

export default store;