import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './auth/auth.slice.jsx'

export const store = configureStore({
  reducer: {
     auth: authenticationSlice,
  },
})