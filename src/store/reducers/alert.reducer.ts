import { createSlice } from "@reduxjs/toolkit";

export const alertReducer = createSlice({
  name: "alertReducer",
  initialState: {
    isSuccess: false,
    isShow: false,
    message: "",
  },
  reducers: {
    showAlert(state, action) {
      state.isSuccess = action.payload.isSuccess;
      state.isShow = action.payload.isShow;
      state.message = action.payload.message;
    },
  },
});

export const { showAlert } = alertReducer.actions;

export default alertReducer.reducer;
