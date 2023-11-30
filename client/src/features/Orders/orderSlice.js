import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder,cancelOrder,fetchOrderbyUser } from './orderApi';

const initialState = {
    orders: [],
    status: 'idle',
    currentOrder: null,
    error: null,
    totalOrders: 0
};

export const createOrderAsync = createAsyncThunk(
  'order/createorder',
  async (order,{rejectWithValue}) => {
    try {
        const response = await createOrder(order);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
  }
);

export const fetchOrderByUserAsync = createAsyncThunk(
  'order/fetchOrderUser',
  async (_,{rejectWithValue}) => {
    try {
        const response = await fetchOrderbyUser();
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
  }
);



export const cancelOrderAsync = createAsyncThunk(
  'order/cancelorder',
  async (itemId,{rejectWithValue}) => {
    try {
        const response = await cancelOrder();
        return response.data;
    } catch (error) {
        return rejectWithValue(itemId);
    }
    
  }
);



export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(fetchOrderByUserAsync.pending,(state,action)=>{
         state.status = "loading";
      })
      .addCase(fetchOrderByUserAsync.fulfilled,(state,action)=>{
        state.status = "idle";
        state.orders = action.payload;
     })
     .addCase(fetchOrderByUserAsync.rejected,(state,action)=>{
      state.status = "rejected";
      state.error = action.payload;
   })
  },
});


export const selectorders = (state) => state.order.orders;
export const selectcurrentorder = (state) => state.order.currentOrder;
export const selectCartStatus = (state) => state.order.status;


export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;