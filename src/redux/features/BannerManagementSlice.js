import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api.js";
import { toast } from "react-toastify";

export const CreateBannerManagementSlice = createAsyncThunk(
  "admin/addbanner",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.AddBannerApi(data);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const GetBannerListSlice = createAsyncThunk(
  "admin/bannerlist",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.GetBannerListApi(page);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const EditBannerSlice = createAsyncThunk(
  "/admin/updateBanner/id",
  async (data, { rejectWithValue }) => {
    console.log("data:",data);
    try {
      const response = await api.EditBannerApi(data);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const DeleteBannerSlice = createAsyncThunk(
  "admin/deleteBanner/",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.DeleteBannerApi(id);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const SearchBannerSlice = createAsyncThunk(
  "admin/banner-searchbar",
  async (searchKey, { rejectWithValue }) => {
    try {
      const response = await api.BannerSearchBarApi(searchKey);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

///Deal banners
// -----------------

export const CreateDealBannerManagementSlice = createAsyncThunk(
  "/admin/adddealbanner",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.CreateDealBannerApi(data);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const GetDealBannerListSlice = createAsyncThunk(
  "admin/dealbannerlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.GetDealBannerListApi();
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const EditDealBannerSlice = createAsyncThunk(
  "admin/updatedealBanner/id",
  async (data, { rejectWithValue }) => {
    console.log("data:",data);
    try {
      const response = await api.EditDealBannerApi(data);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);


export const DeleteDealBannerSlice = createAsyncThunk(
  "admin/deletedealBanner",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.DeleteDealBannerApi(id);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);


export const DealSearchBannerSlice = createAsyncThunk(
  "admin/Dealbanner-searchbar",
  async (searchKey, { rejectWithValue }) => {
    try {
      const response = await api.DealBannerSearchBarApi(searchKey);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);


const BannerManagementSlice = createSlice({
  name: "BannerManagement",
  initialState: {
    AddBannerManagent: [],
    AddDealBanner:[],
    BannerList:[],
    DealBannerList:[],
    updatedBanner:[],
    updatedDealBanner:[],
    BannerSearchData:[],
    deletedBanner:[],
    deletedDealBanner:[],
    EditBannerId:null,
    EditDealBannerId:null,
    loading: false,
    error: null,
    validationErrors: [],
  },
  reducers: {
    InsertEditBannerID(state,action){
      console.log("action.payload:",action);
      state.EditBannerId = action.payload
    },
    InsertEditDealBannerID(state,action){
      state.EditDealBannerId = action.payload
    }
  },
  extraReducers: (builder) => {
    const handlePendingState = (state, action) => {
      state.loading = true;
      state.error = null;
      state.validationErrors = [];
    };

    const handleRejectState = (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred";
      state.validationErrors = action.payload?.errors || [];
      console.log("called")
      // toast.error(state.error);
    };

    builder
      .addCase(CreateBannerManagementSlice.pending, handlePendingState)
      .addCase(CreateBannerManagementSlice.fulfilled, (state, action) => {
        // console.log("action", action);
        state.AddBannerManagent = action.payload.data;
        state.loading = false;
        toast.success(action?.payload?.message);
      })
      .addCase(CreateBannerManagementSlice.rejected, handleRejectState)

      .addCase(CreateDealBannerManagementSlice.pending, handlePendingState)
      .addCase(CreateDealBannerManagementSlice.fulfilled, (state, action) => {
        state.AddDealBanner = action.payload.data;
        state.loading = false;
        toast.success(action?.payload?.message);
      })
      .addCase(CreateDealBannerManagementSlice.rejected, handleRejectState)

      .addCase(GetBannerListSlice.pending, handlePendingState)
      .addCase(GetBannerListSlice.fulfilled, (state, action) => {
        state.BannerList = action.payload.data;
        state.loading = false;
        // toast.success(action?.payload?.message);
      })
      .addCase(GetBannerListSlice.rejected, handleRejectState)

      .addCase(GetDealBannerListSlice.pending, handlePendingState)
      .addCase(GetDealBannerListSlice.fulfilled, (state, action) => {
        state.DealBannerList = action.payload.data;
        state.loading = false;
        // toast.success(action?.payload?.message);
      })
      .addCase(GetDealBannerListSlice.rejected, handleRejectState)

      .addCase(EditBannerSlice.pending, handlePendingState)
      .addCase(EditBannerSlice.fulfilled, (state, action) => {
        state.updatedBanner = action.payload.data;
        state.loading = false;
        toast.success("Banner Edited Successfully!");
      })
      .addCase(EditBannerSlice.rejected, handleRejectState)

      .addCase(DeleteBannerSlice.pending, handlePendingState)
      .addCase(DeleteBannerSlice.fulfilled, (state, action) => {
        state.deletedBanner = action.payload.data;
        state.loading = false;
        toast.success("Banner deleted Successfully!");
      })
      .addCase(DeleteBannerSlice.rejected, handleRejectState)

      .addCase(DeleteDealBannerSlice.pending, handlePendingState)
      .addCase(DeleteDealBannerSlice.fulfilled, (state, action) => {
        state.deletedDealBanner = action.payload.data;
        state.loading = false;
        toast.success("Deal Banner deleted Successfully!");
      })
      .addCase(DeleteDealBannerSlice.rejected, handleRejectState)

      .addCase(EditDealBannerSlice.pending, handlePendingState)
      .addCase(EditDealBannerSlice.fulfilled, (state, action) => {
        state.updatedDealBanner = action.payload.data;
        state.loading = false;
        toast.success("Deal Banner updated Successfully!");
      })
      .addCase(EditDealBannerSlice.rejected, handleRejectState)

      .addCase(SearchBannerSlice.pending, handlePendingState)
      .addCase(SearchBannerSlice.fulfilled, (state, action) => {
        state.BannerList = action.payload.data;
        state.loading = false;
        // toast.success("Deal Banner updated Successfully!");
      })
      .addCase(SearchBannerSlice.rejected, handleRejectState)
     
      .addCase(DealSearchBannerSlice.pending, handlePendingState)
      .addCase(DealSearchBannerSlice.fulfilled, (state, action) => {
        state.DealBannerList = action.payload.data;
        state.loading = false;
        // toast.success("Deal Banner updated Successfully!");
      })
      .addCase(DealSearchBannerSlice.rejected, handleRejectState)
  },
});

export const { InsertEditBannerID, InsertEditDealBannerID } = BannerManagementSlice.actions;

export default BannerManagementSlice.reducer;