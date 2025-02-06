import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api.js";
import { toast } from 'react-toastify';

export const GetCityManagementSlice = createAsyncThunk("admin/getall-products",async (page, { rejectWithValue }) => {
    try {
      const response = await api.GetCityManagementApi(page);
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

export const AddCityManagementSlice = createAsyncThunk("admin/addcity",async (formData, { rejectWithValue }) => {
    try {
      const response = await api.AddCityManagementApi(formData);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const UpdateCityManagementSlice = createAsyncThunk("admin/updatecity/?id",async (data, { rejectWithValue }) => {
    try {
      const response = await api.UpdateCityManagementApi(data);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const DeleteCityManagementSlice = createAsyncThunk("admin/deleteCity/id",async (id, { rejectWithValue }) => {
    try {
      const response = await api.DeleteCityManagementApi(id);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

const CityManagementSlice = createSlice({
  name: 'CityManagementSlice',
  initialState: {
    CityManagement:[],
    DeletedCityManagement:[],
    UpdatedCityManagement:[],
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
      console.log(action.payload)
      state.loading = false;
      state.error = action.payload?.error || "An error occurred";
      state.validationErrors = action.payload?.errors || []; 
      // toast.error(state.error);
    }

    builder
      .addCase(GetCityManagementSlice.pending,handlePendingState)
      .addCase(GetCityManagementSlice.fulfilled, (state, action) => {
        state.CityManagement = action.payload.data; 
        state.loading = false;
        // toast.success(action?.payload?.message); 
      })
      .addCase(GetCityManagementSlice.rejected,(state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.error = action.payload?.error || "An error occurred";
        state.validationErrors = action.payload?.errors || []; 
        // toast.error(state.error);
      })

      .addCase(DeleteCityManagementSlice.pending,handlePendingState)
      .addCase(DeleteCityManagementSlice.fulfilled, (state, action) => {
        state.DeletedCityManagement = action.payload.data; 
        state.loading = false;
        toast.success("City is deleted successfully!"); 
      })
      .addCase(DeleteCityManagementSlice.rejected,handleRejectState)

      .addCase(AddCityManagementSlice.pending,handlePendingState)
      .addCase(AddCityManagementSlice.fulfilled, (state, action) => {
        state.CityManagement.push(action.payload.data); 
        state.loading = false;
        toast.success("City is created successfully!"); 
      })
      .addCase(AddCityManagementSlice.rejected,handleRejectState)

      .addCase(UpdateCityManagementSlice.pending,handlePendingState)
      .addCase(UpdateCityManagementSlice.fulfilled, (state, action) => {
        state.UpdatedCityManagement=action.payload.data; 
        state.loading = false;
        toast.success("City is updated successfully!"); 
      })
      .addCase(UpdateCityManagementSlice.rejected,handleRejectState)
  },
});


export default CityManagementSlice.reducer;
