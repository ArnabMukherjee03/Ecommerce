import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchProductById} from './productApi';

const initialState = {
    products: [],
    status: "idle",
    selectedProduct: null,
    error: null,
}

// Define your async thunk
export const fetchAllProductsasync = createAsyncThunk(
    'product/getProducts', 
    async (_,{ rejectWithValue }) => {
      try {
        const response = await fetchAllProducts();
        return response.data;
      } catch (error) {
        console.log(error.message);
        return rejectWithValue(error);
      }
        
});

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id,{rejectWithValue}) => {
    try {
      const response = await fetchProductById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsasync.pending, (state) => {
        state.status = 'loading';
      
      })
      .addCase(fetchAllProductsasync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchAllProductsasync.rejected,(state,action)=>{
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;
