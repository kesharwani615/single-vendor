import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api.js";
import { toast } from 'react-toastify';

export const GetProductCategorySlice = createAsyncThunk("admin/category-list",async (data, { rejectWithValue }) => {
    try {
      const response = await api.GetProductCategoryApi(data);
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

export const CreateCategoryProductSlice = createAsyncThunk('admin/category-insert',async (formData, { rejectWithValue }) => {
  try {
    const response = await api.CreateProductCategoryApi(formData);
      return response.data;
    } catch (error) {
    console.error("API error:", error);
    return rejectWithValue(error.response?.data || { message: "An error occurred" });
  }
}
);

export const EditCategoryProductSlice = createAsyncThunk('admin/category-update/id',async (data, { rejectWithValue }) => {
  try {
    console.log("data:",data);
    const response = await api.EditProductCategoryApi(data);
      return response.data;
    } catch (error) {
    console.error("API error:", error);
    return rejectWithValue(error.response?.data || { message: "An error occurred" });
  }
}
);

export const DeleteCategoryProductSlice = createAsyncThunk('admin/category-delete/id',async (id, { rejectWithValue }) => {
  try {
    console.log("id:",id);
    const response = await api.DeleteProductCategoryApi(id);
      return response.data;
    } catch (error) {
    console.error("API error:", error);
    return rejectWithValue(error.response?.data || { message: "An error occurred" });
  }
}
);

///sub category slice

export const GetSubCategoryProductSlice = createAsyncThunk('admin/subcategory-list/id',async (id, { rejectWithValue }) => {
    try {
      const response = await api.GetSubCategoryProductApi(id);
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

export const CreateSubCategoryProductSlice = createAsyncThunk('admin/subcategory-insert',async (data, { rejectWithValue }) => {
    try {
      const response = await api.CreateSubCategoryProductApi(data);
      console.log("Response:",response)
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const EditSubCategoryProductSlice = createAsyncThunk('admin/subcategory-update/id',async (data, { rejectWithValue }) => {
    try {
      const response = await api.EditSubProductCategoryApi(data);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const DeleteSubCategoryProductSlice = createAsyncThunk('admin/subcategory-delete/id',async (id, { rejectWithValue }) => {
  try {
    const response = await api.DeleteSubProductCategoryApi(id);
      return response.data;
    } catch (error) {
    console.error("API error:", error);
    return rejectWithValue(error.response?.data || { message: "An error occurred" });
  }
}
);

const ProductCategorySlice = createSlice({
  name: 'ProductCategory',
  initialState: {
    ProductCategoryList: [],
    SubCategoryProductList: [],
    createdSubCategory:[],
    createdCategory:[],
    DeleteCategory:[],
    DeleteSubCategory:[],
    EditedProductCategory:[],
    EditedSubProductCategory:[],
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
      state.error = action.payload?.message || "An error occurred";
      state.validationErrors = action.payload?.errors || []; 
      // toast.error(state.error);
    }

    builder
      .addCase(GetProductCategorySlice.pending,handlePendingState)
      .addCase(GetProductCategorySlice.fulfilled, (state, action) => {
        state.ProductCategoryList = action.payload.data; 
        state.loading = false;
        // toast.success(action?.payload?.message); 
      })
      .addCase(GetProductCategorySlice.rejected,(state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.error = action.payload?.error || "An error occurred";
        state.validationErrors = action.payload?.errors || []; 
        // toast.error(state.error);
      })

      .addCase(GetSubCategoryProductSlice.pending,handlePendingState)
      .addCase(GetSubCategoryProductSlice.fulfilled, (state, action) => {
        state.SubCategoryProductList = action.payload.data; 
        state.loading = false;
        // toast.success(action?.payload?.message); 
      })
      .addCase(GetSubCategoryProductSlice.rejected,handleRejectState)
     
      .addCase(CreateCategoryProductSlice.pending,handlePendingState)
      .addCase(CreateCategoryProductSlice.fulfilled, (state, action) => {
        state.createdCategory = action.payload.data; 
        state.loading = false;
        toast.success("Product Category is Created!"); 
      })
      .addCase(CreateCategoryProductSlice.rejected,handleRejectState)

      .addCase(CreateSubCategoryProductSlice.pending,handlePendingState)
      .addCase(CreateSubCategoryProductSlice.fulfilled, (state, action) => {
        state.createdSubCategory = action.payload.data; 
        state.loading = false;
        toast.success("Product SubCategory is Created!"); 
      })
      .addCase(CreateSubCategoryProductSlice.rejected,(state, action) => {
        console.log("action.payload:",action)
        state.loading = false;
        state.error = action.payload?.error || "An error occurred";
        state.validationErrors = action.payload?.errors || []; 
        toast.error(state.error);
      })
      
      .addCase(EditCategoryProductSlice.pending,handlePendingState)
      .addCase(EditCategoryProductSlice.fulfilled, (state, action) => {
        state.EditedProductCategory = action.payload.data; 
        state.loading = false;
        toast.success("Product Category is Edited!"); 
      })
      .addCase(EditCategoryProductSlice.rejected,handleRejectState)
   
      .addCase(DeleteCategoryProductSlice.pending,handlePendingState)
      .addCase(DeleteCategoryProductSlice.fulfilled, (state, action) => {
        state.DeleteCategory = action.payload.data; 
        state.loading = false;
        toast.success("Product Category is delete!"); 
      })
      .addCase(DeleteCategoryProductSlice.rejected,handleRejectState)

      .addCase(EditSubCategoryProductSlice.pending,handlePendingState)
      .addCase(EditSubCategoryProductSlice.fulfilled, (state, action) => {
        state.EditedSubProductCategory = action.payload.data;
        state.loading = false;
        toast.success("Product Sub-Category is Edited!"); 
      })
      .addCase(EditSubCategoryProductSlice.rejected,handleRejectState)

      .addCase(DeleteSubCategoryProductSlice.pending,handlePendingState)
      .addCase(DeleteSubCategoryProductSlice.fulfilled, (state, action) => {
        state.DeleteSubCategory = action.payload.data;
        state.loading = false;
        toast.success("Product Sub-Category is deleted!"); 
      })
      .addCase(DeleteSubCategoryProductSlice.rejected,handleRejectState);
  },
});


export default ProductCategorySlice.reducer;
