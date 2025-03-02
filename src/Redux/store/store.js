import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Slice/counterSlice";
import cartReducer from "../Slice/cartSlice";
import productReducer, { fetchProducts } from "../Slice/productSlice";
import { apiSlice } from "../Slice/apiSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    products: productReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // ✅ Redux store-এ API reducer যোগ করা
  },
  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(apiSlice.middleware), // ✅ Middleware যোগ করা
});

export default store;
store.dispatch(fetchProducts())