import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, createUser, signOut, checkAuth } from "./authApi";
import {toast} from "react-hot-toast";

const initialState = {
  loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
  status: "idle",
  isSuccess: false,
  error: null,
  userChecked: false,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData, {rejectWithValue}) => {
    try {
      const response = await createUser(userData);
      if(response){
        toast.success("New Account Created");
      }
      return response.data;
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error || "Something Went Wrong")
      return rejectWithValue(error);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      if(response){
        toast.success("Login Sucessfull");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  "user/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkAuth();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signOutAsync = createAsyncThunk(
  "user/signOut",
  async (_, { rejectWithValue }) => {
    try {
      const response = await signOut();
      if(response){
        toast.success("Logout Sucessfully");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.isSuccess = true;
        state.error = null;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.isSuccess = false;
        state.error = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
        state.isSuccess = true;
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.isSuccess = true;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.isSuccess = false;
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
        state.userChecked = false;
        state.error = null;
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
        state.userChecked = false;
        state.error = null;
      })
      .addCase(signOutAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.loggedInUserToken = null;
        state.error = action.payload;
        state.userChecked = false;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = false;
      });
  },
});

export const selectSucess = (state) => state.auth.isSuccess;
export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const { resetSuccess } = authSlice.actions;
export default authSlice.reducer;
