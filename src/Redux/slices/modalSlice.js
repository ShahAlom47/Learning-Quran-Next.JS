import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  content: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.content = action.payload; // ডায়নামিক কন্টেন্ট সেট করবো
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
