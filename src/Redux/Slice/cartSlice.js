import { getCartData } from "@/src/lib/api_request/api_request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  error: null,
};

// Async thunk for fetching cart data
export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async () => {
    const datas = await getCartData();
    return datas;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Delete item from cart
    deleteCartItem: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },

    // Update item quantity
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.data.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action?.error?.message;
      });
  },
});

// Export actions
export const { deleteCartItem, updateCartQuantity } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
