import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api.js";
import { toast } from 'react-toastify';

export const GetUserManagementSlice = createAsyncThunk("admin/customers-list",async (data, { rejectWithValue }) => {
    try {
      const response = await api.UserManagementApi(data);
      console.log("response:",response);
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data);  
      }
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const GetUserDetailOnIdBasisSlice = createAsyncThunk("/admin/customer-info/id",async (id, { rejectWithValue }) => {
    try {
      const response = await api.UserDetailsOnIdBasisApi(id);
      console.log("response:",response);
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data);  
      }
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

const UserManagementSlice = createSlice({
  name: 'UserManagement',
  initialState: {
    UserManagement: [],
    UserDetails: [],
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
      // toast.error(state.error);
    }

    builder
      .addCase(GetUserManagementSlice.pending,handlePendingState)
      .addCase(GetUserManagementSlice.fulfilled, (state, action) => {
        console.log("action",action)
        state.UserManagent = action.payload.data; 
        state.loading = false;
        // toast.success(action?.payload?.message); 
      })
      .addCase(GetUserManagementSlice.rejected,handleRejectState)
    
      .addCase(GetUserDetailOnIdBasisSlice.pending,handlePendingState)
      .addCase(GetUserDetailOnIdBasisSlice.fulfilled, (state, action) => {
        console.log("action",action)
        state.UserDetails = action.payload.data; 
        state.loading = false;
        // toast.success(action?.payload?.message); 
      })
      .addCase(GetUserDetailOnIdBasisSlice.rejected,handleRejectState)
  },
});


export default UserManagementSlice.reducer;
