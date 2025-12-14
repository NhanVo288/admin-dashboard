import { createSlice } from '@reduxjs/toolkit';
import { checkAuth, logIn } from '../auth.thunk';


export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState:{
    authUser: null,
    isCheckingAuth: false,
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
  }
});


export default authenticationSlice.reducer;