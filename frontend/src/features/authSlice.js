import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: JSON.parse(sessionStorage.getItem("isLogged")) || false,
  user_details: JSON.parse(sessionStorage.getItem("user_details")) ||null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      sessionStorage.setItem("user_details",JSON.stringify(action.payload));
      sessionStorage.setItem("isLogged",JSON.stringify(true))
      state.isLogged = true;
      state.user_details = action.payload;
    },
    logout: (state) => {
      sessionStorage.removeItem('user_details');
      sessionStorage.removeItem('isLogged');
      state.isLogged = false;
      state.user_details = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
