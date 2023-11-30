import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchBrand,fetchCategories,fetchProductById} from './productApi';

const initialState = {
    products: [],
    status: "idle",
    selectedProduct: null,
    error: null, 
    brands: [],
    category:[],
}

// Define your async thunk
export const fetchAllProductsasync = createAsyncThunk(
    'product/getProducts', 
    async ({ filter, sort},{ rejectWithValue }) => {
      try {
        const response = await fetchAllProducts(filter,sort);
        return response.data;
      } catch (error) {
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

export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async (_,{rejectWithValue}) => {
    try {
      const response = await fetchCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export const fetchBrandAsync = createAsyncThunk(
  'product/fetchBrand',
  async (_,{rejectWithValue}) => {
    try {
      const response = await fetchBrand();
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
        state.selectedProduct = null;
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
      .addCase(fetchCategoriesAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.category = action.payload;
      })
      .addCase(fetchBrandAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(fetchBrandAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.brands = action.payload;
      })
  },
});

export const selectloading = (state) => state.product.status;
export const selectAllProducts = (state) => state.product.products;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectBrands = (state) => state.product.brands;
export const selectCategory = (state) => state.product.category;
export default productSlice.reducer;
