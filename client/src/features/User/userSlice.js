import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUser, fetchLoggedInUser } from "./userApi";
import toast from 'react-hot-toast';

const initialState = {
  status: "idle",
  userInfo: null,
  error: null,
};

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchLoggedInUser();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    try {
      const response = await updateUser(update);
      toast.success("Your Profile Updated");
      return response.data;
    } catch (error) {
      toast.error("Profile not updated");
      console.log(error)
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;

export default userSlice.reducer;
