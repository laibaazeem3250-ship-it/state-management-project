import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // { id, title, price, image, qty }
  },
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...product, qty: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    increment: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty += 1;
    },
    decrement: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty -= 1;
      state.items = state.items.filter((i) => i.qty > 0);
    },
    clear: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, increment, decrement, clear } = cartSlice.actions;
export default cartSlice.reducer;
