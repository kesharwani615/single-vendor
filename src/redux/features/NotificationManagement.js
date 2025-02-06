import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api.js";
import { toast } from 'react-toastify';

export const NotificationCreatedSlice = createAsyncThunk("/admin/createNotification",async (data, { rejectWithValue }) => {
    try {
      const response = await api.CreateNotificationManagementApi(data);
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const GetNotificationSlice = createAsyncThunk("admin/listNotification",async (dataSet, { rejectWithValue }) => {
    try {
      const response = await api.GetNotificationManagementApi(dataSet);
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const UpdateNotificationSlice = createAsyncThunk("admin/updateNotification/:id",async (data, { rejectWithValue }) => {
    try {
      const response = await api.UpdateNotificationManagementApi(data);
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const DeleteNotificationSlice = createAsyncThunk("admin/deleteNotification/:id",async (id, { rejectWithValue }) => {
    try {
      const response = await api.DeleteNotificationManagementApi(id);
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);





const NotifcationManagementSlice = createSlice({
  name: 'Notification',
  initialState: {
    AllNotification:[],
    NotificationCreated:[],
    UpdatedNotification:[],
    DeletedNotification:[],
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
      .addCase(NotificationCreatedSlice.pending,handlePendingState)
      .addCase(NotificationCreatedSlice.fulfilled, (state, action) => {
        state.NotificationCreated = action.payload.data; 
        state.loading = false;
        toast.success("Notification Created Successfully!");
      })
      .addCase(NotificationCreatedSlice.rejected,handleRejectState)

      .addCase(GetNotificationSlice.pending,handlePendingState)
      .addCase(GetNotificationSlice.fulfilled, (state, action) => {
        state.AllNotification = action.payload.data; 
        state.loading = false;
        // toast.success("Notification Created Successfully!"); 
      })
      .addCase(GetNotificationSlice.rejected,handleRejectState)

      .addCase(UpdateNotificationSlice.pending,handlePendingState)
      .addCase(UpdateNotificationSlice.fulfilled, (state, action) => {
        state.UpdatedNotification = action.payload.data; 
        state.loading = false;
        toast.success("Notification Created Successfully!"); 
      })
      .addCase(UpdateNotificationSlice.rejected,handleRejectState)
    
      .addCase(DeleteNotificationSlice.pending,handlePendingState)
      .addCase(DeleteNotificationSlice.fulfilled, (state, action) => {
        state.DeletedNotification = action.payload.data; 
        state.loading = false;
        toast.success("Notification Deleted Successfully!"); 
      })
      .addCase(DeleteNotificationSlice.rejected,handleRejectState)
  },
});


export default NotifcationManagementSlice.reducer;
