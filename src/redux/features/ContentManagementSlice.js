import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api.js";
import { toast } from 'react-toastify';

export const AboutUsContentManagementSlice = createAsyncThunk("admin/aboutusget",async (_, { rejectWithValue }) => {
    try {
      const response = await api.GetAboutUsContentManagementApi();
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const PrivacyPolicyContentManagementSlice = createAsyncThunk("admin/privacyget",async (_, { rejectWithValue }) => {
    try {
      const response = await api.GetPrivacyPolicyContentManagementApi();
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);
export const TermAndConditionContentManagementSlice = createAsyncThunk("admin/Termget",async (_, { rejectWithValue }) => {
    try {
      const response = await api.GetTermConditionContentManagementApi();
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const ContactUsManagementSlice = createAsyncThunk("admin/contactdata",async (_, { rejectWithValue }) => {
    try {
      const response = await api.GetContactUsManagementApi();
      console.log("response:",response);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

//update Content

export const UpdateAboutUsContentManagementSlice = createAsyncThunk("admin/UpdateAboutUs",async (data, { rejectWithValue }) => {
  try {
    const response = await api.UpdateAboutUsContentManagementApi(data);
    console.log("response:",response);
      return response.data;
  } catch (error) {
    console.error("API error:", error);
    return rejectWithValue(error.response?.data || { message: "An error occurred" });
  }
}
);
export const UpdateTermConditionContentManagementSlice = createAsyncThunk("admin/UpdateTermCondition",async (data, { rejectWithValue }) => {
  try {
    const response = await api.UpdateTermConditionContentManagementApi(data);
    console.log("response:",response);
      return response.data;
  } catch (error) {
    console.error("API error:", error);
    return rejectWithValue(error.response?.data || { message: "An error occurred" });
  }
}
);
export const UpdatePrivacyPolicyContentManagementSlice = createAsyncThunk("admin/UpdatePrivacyPolicy",async (data, { rejectWithValue }) => {
  try {
    const response = await api.UpdatePrivacyPolicContentManagementApi(data);
    console.log("response:",response);
      return response.data;
  } catch (error) {
    console.error("API error:", error);
    return rejectWithValue(error.response?.data || { message: "An error occurred" });
  }
}
);

export const UpdateContactUsManagementSlice = createAsyncThunk("admin/contactupdate/",async (data, { rejectWithValue }) => {
  try {
    const response = await api.UpdateContactUsManagementApi(data);
    console.log("response:",response);
      return response.data;
  } catch (error) {
    console.error("API error:", error);
    return rejectWithValue(error.response?.data || { message: "An error occurred" });
  }
}
);


const ContentManagemnt = createSlice({
  name: 'ContentManagemnt',
  initialState: {
    AboutUsContent: [],
    PrivacyPolicyContent: [],
    TermConditionContent: [],
    ContactUsContent: [],
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
      .addCase(AboutUsContentManagementSlice.pending,handlePendingState)
      .addCase(AboutUsContentManagementSlice.fulfilled, (state, action) => {
        console.log("action",action)
        state.AboutUsContent = action.payload.data; 
        state.loading = false; 
      })
      .addCase(AboutUsContentManagementSlice.rejected,handleRejectState)

      .addCase(PrivacyPolicyContentManagementSlice.pending,handlePendingState)
      .addCase(PrivacyPolicyContentManagementSlice.fulfilled, (state, action) => {
        console.log("action",action)
        state.PrivacyPolicyContent = action.payload.data; 
        state.loading = false; 
      })
      .addCase(PrivacyPolicyContentManagementSlice.rejected,handleRejectState)

      .addCase(TermAndConditionContentManagementSlice.pending,handlePendingState)
      .addCase(TermAndConditionContentManagementSlice.fulfilled, (state, action) => {
        console.log("action",action)
        state.TermConditionContent = action.payload.data; 
        state.loading = false; 
      })
      .addCase(TermAndConditionContentManagementSlice.rejected,handleRejectState)

      .addCase(ContactUsManagementSlice.pending,handlePendingState)
      .addCase(ContactUsManagementSlice.fulfilled, (state, action) => {
        state.ContactUsContent = action.payload.data; 
        state.loading = false; 
      })
      .addCase(ContactUsManagementSlice.rejected,handleRejectState)

      .addCase(UpdateAboutUsContentManagementSlice.pending,handlePendingState)
      .addCase(UpdateAboutUsContentManagementSlice.fulfilled, (state, action) => {
        console.log("action",action)
        state.TermConditionContent = action.payload.data; 
        state.loading = false; 
        toast.success('About us Content Updated Successfully!');
      })
      .addCase(UpdateAboutUsContentManagementSlice.rejected,handleRejectState)

      .addCase(UpdateTermConditionContentManagementSlice.pending,handlePendingState)
      .addCase(UpdateTermConditionContentManagementSlice.fulfilled, (state, action) => {
        console.log("action",action)
        state.TermConditionContent = action.payload.data; 
        state.loading = false; 
        toast.success('Term and Condition Content Updated Successfully!');
      })
      .addCase(UpdateTermConditionContentManagementSlice.rejected,handleRejectState)

      .addCase(UpdatePrivacyPolicyContentManagementSlice.pending,handlePendingState)
      .addCase(UpdatePrivacyPolicyContentManagementSlice.fulfilled, (state, action) => {
        console.log("action",action)
        state.TermConditionContent = action.payload.data; 
        state.loading = false; 
        toast.success('Privacy and Policy Content Updated Successfully!');
      })
      .addCase(UpdatePrivacyPolicyContentManagementSlice.rejected,handleRejectState)

      .addCase(UpdateContactUsManagementSlice.pending,handlePendingState)
      .addCase(UpdateContactUsManagementSlice.fulfilled, (state, action) => {
        console.log("action",action)
        state.ContactUsContent = action.payload.data; 
        state.loading = false; 
        toast.success('Privacy and Policy Content Updated Successfully!');
      })
      .addCase(UpdateContactUsManagementSlice.rejected,handleRejectState);
  },
});


export default ContentManagemnt.reducer;
