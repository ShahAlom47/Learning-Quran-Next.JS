
import { getProduct, updateProduct } from "@/src/lib/api_request/api_request";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial State
const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    error: null,
};

// ✅ Fetch Products
 const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getProduct();
            return res;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ✅ Delete Product
 const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            await deleteProduct(id);
            return id; // ডিলিট হওয়া আইডি রিটার্ন করছি
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ✅ Update Product
 const updateProducts = createAsyncThunk(
    'product/updateProduct',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await updateProduct(id, data);
            return res.data; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ✅ Create Slice
export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 🔹 Fetch Products Cases
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })

            // 🔹 Delete Product Case
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product.id !== action.payload);
            })

            // 🔹 Update Product Case
            .addCase(updateProducts.fulfilled, (state, action) => {
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload; // নতুন ডাটা সেট করা হলো
                }
            });
    }
});

// Export Reducer
export default productSlice.reducer;

// Export Actions
export  { fetchProducts, deleteProduct, updateProduct } 
