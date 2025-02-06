import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api.js";
import { toast } from 'react-toastify';

export const GetProductCatalogueSlice = createAsyncThunk("admin/getall-products",async (data, { rejectWithValue }) => {
    try {
      const response = await api.GetProductCatalogueApi(data);
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

export const CreateProductCatalogueSlice = createAsyncThunk(`admin/addnew-product`,async (formData, { rejectWithValue }) => {
    try {
      const response = await api.CreateProductCatalogueApi(formData);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const GetProductOnIdBasisSlice = createAsyncThunk(`admin/getsingle-product/id`,async (id, { rejectWithValue }) => {
    try {
      const response = await api.GetProductOnIdBasisApi(id);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const DeleteProductSlice = createAsyncThunk(`admin/deleteOne-product/id`,async (id, { rejectWithValue }) => {
    try {
      const response = await api.DeleteProductApi(id);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const EditProductSlice = createAsyncThunk(`admin/updatedetils-product/id`,async (data, { rejectWithValue }) => {
    try {
      const response = await api.EditProductApi(data);
        return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);


const ProductCatalogueSlice = createSlice({
  name: 'ProductCatalogue',
  initialState: {
    ProductCatalogue:[],
    CreatedProductCatelouge:[],
    GetProductOnIdBasis:[],
    DeleteProduct:[],
    EditedProduct:[],
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
      .addCase(GetProductCatalogueSlice.pending,handlePendingState)
      .addCase(GetProductCatalogueSlice.fulfilled, (state, action) => {
        state.ProductCatalogue = action.payload.data; 
        state.loading = false;
        // toast.success(action?.payload?.message); 
      })
      .addCase(GetProductCatalogueSlice.rejected,(state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.error = action.payload?.error || "An error occurred";
        state.validationErrors = action.payload?.errors || []; 
      })
      
      .addCase(CreateProductCatalogueSlice.pending,handlePendingState)
      .addCase(CreateProductCatalogueSlice.fulfilled, (state, action) => {
        state.CreatedProductCatelouge = action.payload.data; 
        state.loading = false;
        toast.success("Product Created Successfully!");
      })
      .addCase(CreateProductCatalogueSlice.rejected,handleRejectState)
      
      .addCase(GetProductOnIdBasisSlice.pending,handlePendingState)
      .addCase(GetProductOnIdBasisSlice.fulfilled, (state, action) => {
        state.GetProductOnIdBasis = action.payload.data; 
        state.loading = false;
      })
      .addCase(GetProductOnIdBasisSlice.rejected,(state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.error = action.payload?.error || "An error occurred";
        state.validationErrors = action.payload?.errors || []; 
      })

      .addCase(DeleteProductSlice.pending,handlePendingState)
      .addCase(DeleteProductSlice.fulfilled, (state, action) => {
        state.DeleteProduct = action.payload.data; 
        state.loading = false;
        toast.success("Product delete successfully!");
      })
      .addCase(DeleteProductSlice.rejected,handleRejectState)
      
      .addCase(EditProductSlice.pending,handlePendingState)
      .addCase(EditProductSlice.fulfilled, (state, action) => {
        state.EditedProduct = action.payload.data; 
        state.loading = false;
        toast.success("Product Updated successfully!");
      })
      .addCase(EditProductSlice.rejected,handleRejectState)
  },
});


export default ProductCatalogueSlice.reducer;
