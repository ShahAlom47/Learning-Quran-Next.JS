import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false, // শুধু modal-এর অবস্থা track করবে
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
