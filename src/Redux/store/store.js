import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Slice/counterSlice";
import cartReducer from "../Slice/cartSlice";
import  productReducer, { fetchProducts } from "../Slice/productSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    products: productReducer,
  },
});

store.dispatch(fetchProducts())