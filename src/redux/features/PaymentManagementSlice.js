import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api.js";
import { toast } from 'react-toastify';

export const GetPaymentManagementSlice = createAsyncThunk("admin/paymentList",async (page, { rejectWithValue }) => {
    try {
      const response = await api.GetPaymentManagementApi(page);
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

const PaymentManagementSlice = createSlice({
  name: 'PaymentManagement',
  initialState: {
    PaymentManagent: [],
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
      .addCase(GetPaymentManagementSlice.pending,handlePendingState)
      .addCase(GetPaymentManagementSlice.fulfilled, (state, action) => {
        console.log("action",action)
        state.PaymentManagent = action.payload.data;
        state.loading = false;
        // toast.success(action?.payload?.message); 
      })
      .addCase(GetPaymentManagementSlice.rejected,handleRejectState);
  },
});


export default PaymentManagementSlice.reducer;
