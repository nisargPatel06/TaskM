// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  roleId: localStorage.getItem("roleId") || null,
  name: null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const getNameFromToken = (token) => {
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1])).name;
  } catch (e) {
    console.error("Invalid token:", e);
    return null;
  }
};

initialState.name = getNameFromToken(initialState.token);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { token, roleId } = action.payload;
      state.token = token;
      state.roleId = roleId;
      state.isAuthenticated = true;
      state.name = getNameFromToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("roleId", roleId);
    },
    logout(state) {
      state.token = null;
      state.roleId = null;
      state.name = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("roleId");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
