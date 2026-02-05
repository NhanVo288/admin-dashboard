import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 0,
  size: 10,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
  },
});

export const { setPage, setSize } = userSlice.actions;
export default userSlice.reducer;
