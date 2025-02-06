import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api.js";
import { toast } from 'react-toastify';

export const GetCustomerAbandonedCartSlice = createAsyncThunk("admin/orderslist",async (page, { rejectWithValue }) => {
    try {
      const response = await api.GetCustomerAbandonedCartApi(page);
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const GetDetailProductsabandonedSlice = createAsyncThunk("admin/detailproductsabandoned/id",async (id, { rejectWithValue }) => {
    try {
      const response = await api.GetDetailProductsabandonedApi(id);
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);



const AbandonedCartManagmentSlice = createSlice({
  name: 'AbandonedCartManagment',
  initialState: {
    CustomerAbandonedCartList: [],
    DetailsAbandonedCartList: [],
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
      .addCase(GetCustomerAbandonedCartSlice.pending,handlePendingState)
      .addCase(GetCustomerAbandonedCartSlice.fulfilled, (state, action) => {
        console.log("action",action)
        state.CustomerAbandonedCartList = action.payload.data; 
        state.loading = false;
        // toast.success(action?.payload?.message); 
      })
      .addCase(GetCustomerAbandonedCartSlice.rejected,handleRejectState)
     
      .addCase(GetDetailProductsabandonedSlice.pending,handlePendingState)
      .addCase(GetDetailProductsabandonedSlice.fulfilled, (state, action) => {
        state.DetailsAbandonedCartList = action.payload.data; 
        state.loading = false;
        // toast.success(action?.payload?.message); 
      })
      .addCase(GetDetailProductsabandonedSlice.rejected,handleRejectState)
  },
});


export default AbandonedCartManagmentSlice.reducer;
