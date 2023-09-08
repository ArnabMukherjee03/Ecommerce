import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddress,fetchAddress,updateAddressById,deleteAddressById } from "./addressApi";
import toast from 'react-hot-toast';

const initialState = {
  status: "idle",
  addresses:[],
  error: null,
};

export const fetchAddressAsync = createAsyncThunk(
  "address/fetchAddress",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAddress();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addAddressAsync = createAsyncThunk(
  "address/addAddress",
  async (address) => {
    try {
      const response = await addAddress(address);
      toast.success("New Address Added");
      return response.data;
    } catch (error) {
      toast.error("Something Error");
      console.log(error)
    }
  }
);

export const updateAddressByIdAsync = createAsyncThunk(
  "address/updateAddressById",
  async (address) => {
    try {
      const response = await updateAddressById(address);
      toast.success("Address Update Successfully");
      return response.data;
    } catch (error) {
      toast.error("Something Wrong");
      console.log(error)
    }
  }
);

export const deleteAddressByIdAsync = createAsyncThunk(
  "address/deleteAddressById",
  async (id) => {
    try {
      
      const response = await deleteAddressById(id);
      toast.success("Address Deleted Successfully");
      return response.data;
    } catch (error) {
      toast.error("Something Wrong");
      console.log(error)
    }
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAddressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.addresses.push(action.payload);
      })
      .addCase(addAddressAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(fetchAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.addresses = action.payload;
      })
      .addCase(fetchAddressAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(updateAddressByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAddressByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index =  state.addresses.findIndex(address=>address._id===action.payload._id)
        state.addresses[index] = action.payload;
      })
      .addCase(updateAddressByIdAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(deleteAddressByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAddressByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index =  state.addresses.findIndex(address=>address._id===action.payload._id)
        state.addresses.splice(index,1);
      })
      .addCase(deleteAddressByIdAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const selectAddress = (state) => state.address.addresses;
export const selectLoading = (state) => state.address.status;

export default addressSlice.reducer;
