import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer, // slice 1
    products: productsReducer, // slice 2 (async thunk lives here)
  },
});
