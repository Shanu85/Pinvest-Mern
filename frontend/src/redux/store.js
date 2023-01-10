import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import productReducer from './features/products/productSlice';
import filterReducer from './features/products/filterSlice'

export const store=configureStore({
    reducer:
    {
        auth:authReducer,
        product:productReducer,
        filter:filterReducer
    }
});

export default store;