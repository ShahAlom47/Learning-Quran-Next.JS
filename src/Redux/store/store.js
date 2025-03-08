import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../RTKapi/userApi";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    [userApi.reducerPath]: userApi.reducer, // ✅ Redux store-এ API reducer যোগ করা
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // .concat(apiSlice.middleware) // ✅ Middleware সঠিকভাবে যোগ করা
      .concat(userApi.middleware), // ✅ Middleware সঠিকভাবে যোগ করা
});

export default store;
