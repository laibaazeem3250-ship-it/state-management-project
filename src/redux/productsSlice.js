import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ---- Async thunk: hits a real free API (fakestoreapi.com) ----
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch('https://fakestoreapi.com/products?limit=10');
    if (!res.ok) throw new Error('Failed to load products');
    return res.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
