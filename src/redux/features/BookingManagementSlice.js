import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api.js";
import { toast } from 'react-toastify';

export const GetOrderslistBookingManagementSlice = createAsyncThunk("admin/orderslist",async (page, { rejectWithValue }) => {
    try {
      const response = await api.GetOrderslistBookingManagementApi(page);
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error?.message);
      return rejectWithValue({errors:error?.message} || { message: "An error occurred" });
    }
  }
);

export const GetCancelledOrderslistBookingManagementSlice = createAsyncThunk("admin/cancelledOrders",async (page, { rejectWithValue }) => {
    try {
      const response = await api.GetCancelledOrderslistBookingManagementApi(page);
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const GetCompletedOrderslistBookingManagementSlice = createAsyncThunk("admin/completedOrders",async (page, { rejectWithValue }) => {
    try {
      const response = await api.GetCompletedOrderslistBookingManagementApi(page);
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const updateDecoratorBookingManagementSlice = createAsyncThunk("admin/updateDecorator/?id",async (data, { rejectWithValue }) => {
    try {
      const response = await api.UpdateDecoratorBookingManagementApi(data);
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const CancelBookingManagementSlice = createAsyncThunk("admin/cancelOrder/id",async (data, { rejectWithValue }) => {
    try {
      const response = await api.CancelBookingManagementApi(data);
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

const BookingManagementSlice = createSlice({
  name: 'BookingManagement',
  initialState: {
    Orderslist: [],
    CancelledOrderslist: [],
    CompletedOrderslist: [],
    UpdateDecoratorOrderslist: [],
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
      .addCase(GetOrderslistBookingManagementSlice.pending,handlePendingState)
      .addCase(GetOrderslistBookingManagementSlice.fulfilled, (state, action) => {
        console.log("action",action)
        state.Orderslist = action.payload.data; 
        state.loading = false;
        // toast.success(action?.payload?.message); 
      })
      .addCase(GetOrderslistBookingManagementSlice.rejected,handleRejectState)

      .addCase(GetCancelledOrderslistBookingManagementSlice.pending,handlePendingState)
      .addCase(GetCancelledOrderslistBookingManagementSlice.fulfilled, (state, action) => {
        console.log("action",action)
        state.CancelledOrderslist = action.payload.data;
        state.loading = false;
        // toast.success(action?.payload?.message); 
      })
      .addCase(GetCancelledOrderslistBookingManagementSlice.rejected,handleRejectState)

      .addCase(GetCompletedOrderslistBookingManagementSlice.pending,handlePendingState)
      .addCase(GetCompletedOrderslistBookingManagementSlice.fulfilled, (state, action) => {
        state.CompletedOrderslist = action.payload.data;
        state.loading = false;
        // toast.success(action?.payload?.message); 
      })
      .addCase(GetCompletedOrderslistBookingManagementSlice.rejected,handleRejectState)
     
      .addCase(updateDecoratorBookingManagementSlice.pending,handlePendingState)
      .addCase(updateDecoratorBookingManagementSlice.fulfilled, (state, action) => {
        console.log("action",action)
        state.UpdateDecoratorOrderslist = action.payload.data;
        state.loading = false;
        toast.success("Decorator detail updated successfully!");
      })
      .addCase(updateDecoratorBookingManagementSlice.rejected,handleRejectState)
     
      .addCase(CancelBookingManagementSlice.pending,handlePendingState)
      .addCase(CancelBookingManagementSlice.fulfilled, (state, action) => {
        // state.UpdateDecoratorOrderslist = action.payload.data;
        state.loading = false;
        toast.success("Order cancel successfully!");
      })
      .addCase(CancelBookingManagementSlice.rejected,handleRejectState);
  },
});


export default BookingManagementSlice.reducer;
