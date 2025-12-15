import { createSlice } from '@reduxjs/toolkit';
import { checkAuth, logIn, logout, signUp } from './auth.thunk';


export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState:{
    authUser: null,
    isCheckingAuth: true,
    isSigingUp: false,
    isLogingIn: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder 
      .addCase(checkAuth.pending, state => {
        state.isCheckingAuth = true
      })
      .addCase(checkAuth.fulfilled, (state,action) => {
        state.authUser = action.payload
        state.isCheckingAuth = false
      })
      .addCase(checkAuth.rejected, state => {
        state.isCheckingAuth = false
      })

      .addCase(logIn.pending, state => {
        state.isLogingIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLogingIn = false;
      })
      .addCase(logIn.rejected, state => {
        state.isLogingIn = false;
      })

      .addCase(signUp.pending, state => {
        state.isSigingUp = true
      })
      .addCase(signUp.fulfilled, (state,action) => {
        state.authUser = action.payload
        state.isSigingUp = false
      })
      .addCase(signUp.rejected, state => {
        state.isSigingUp = false
      })

      .addCase(logout.fulfilled, state => {
        state.authUser = null
      })
  }
});


export default authenticationSlice.reducer;