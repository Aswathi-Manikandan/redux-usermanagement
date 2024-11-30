import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload.user || action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload }; // Update local state
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, logout, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
