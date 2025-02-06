import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api.js";
import { toast } from 'react-toastify';

export const UserLoginSlice = createAsyncThunk("admin/admin-signup",async (cred, { rejectWithValue }) => {
    try {
      const response = await api.UserLogin(cred);
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

const AuthSlice = createSlice({
  name: 'Auth',
  initialState: {
    UserCredLogin: [],
    loading: false,
    error: null,
    validationErrors: [],
  },
  reducers: {},
  extraReducers: (builder) => {

    const handlePendingState = (state,action) => {
      state.loading = true;
      state.error = null; 
      state.validationErrors = []; 
    }
    const handleRejectState = (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred";
      state.validationErrors = action.payload?.errors || []; 
      toast.error(state.error);
    }

    builder
      .addCase(UserLoginSlice.pending,handlePendingState)
      .addCase(UserLoginSlice.fulfilled, (state, action) => {
        console.log("action",action)
        state.UserCredLogin = action.payload.data; 
        state.loading = false;
        toast.success("Login Successfuly!"); 
      })
      .addCase(UserLoginSlice.rejected,handleRejectState);
  },
});


export default AuthSlice.reducer;
