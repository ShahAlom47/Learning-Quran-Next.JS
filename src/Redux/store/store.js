import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Slice/counterSlice";
import cartReducer from "../Slice/cartSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  },
});
