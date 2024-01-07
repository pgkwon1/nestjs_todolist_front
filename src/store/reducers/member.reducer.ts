import { createSlice } from "@reduxjs/toolkit";

const memberReducer = createSlice({
  name: "memberReducer",
  initialState: {
    isLogin: false,
    userId: "",
  },
  reducers: {
    setLoginState: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.userId = action.payload.userId;
    },
  },
});
export const { setLoginState } = memberReducer.actions;
export default memberReducer.reducer;
