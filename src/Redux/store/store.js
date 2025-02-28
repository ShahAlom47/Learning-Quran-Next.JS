import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Slice/counterSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer, 
  },
});
