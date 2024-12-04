import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
    isAdmin: false,
    users: [],
  },
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload.user || action.payload;
      state.loading = false;
      state.error = null;
      state.isAdmin = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      state.isAdmin = false;
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    adminSigninStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    adminSigninSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.isAdmin = true;
    },
    adminSigninFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    admindeleteUser: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    adminUpdateUser: (state, action) => {
      const updatedUser = action.payload;
      state.users = state.users.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  logout,
  updateUser,
  adminSigninStart,
  adminSigninSuccess,
  adminSigninFailure,
  setUsers,
  admindeleteUser,
  adminUpdateUser, // Properly export the reducer
} = userSlice.actions;

export default userSlice.reducer;
