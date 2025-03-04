import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Slice/counterSlice";
import cartReducer from "../Slice/cartSlice";
import productReducer from "../Slice/productSlice";
import { apiSlice } from "../Slice/apiSlice";
import { userApi } from "../RTKapi/userApi";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    products: productReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // ✅ Redux store-এ API reducer যোগ করা
    [userApi.reducerPath]: userApi.reducer, // ✅ Redux store-এ API reducer যোগ করা
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware) // ✅ Middleware সঠিকভাবে যোগ করা
      .concat(userApi.middleware), // ✅ Middleware সঠিকভাবে যোগ করা
});

export default store;

// ✅ প্রথমবার লোড হলে `fetchProducts` ডাটা নিয়ে আসবে
// store.dispatch(fetchProducts());
