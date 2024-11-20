import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js'; // Import the reducer from the userSlice

export const store = configureStore({
  reducer: { user: userReducer }, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
