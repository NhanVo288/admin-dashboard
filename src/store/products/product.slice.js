import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 0,
  size: 10,
};

const productSlice = createSlice({
  name: "product",
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

export const { setPage, setSize } = productSlice.actions;
export default productSlice.reducer;
