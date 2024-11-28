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
      state.currentUser = action.payload.user || action.payload; // Ensure user data is correctly stored
      state.loading = false;
      state.error = null;
    },
    
    
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null; // Clear user data
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, logout } =
  userSlice.actions;

export default userSlice.reducer;
