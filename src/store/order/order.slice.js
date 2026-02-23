import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  selectedOrder: null,
  page: 0,
  size: 10
}

 const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedOrder(state, action) {
      state.selectedOrder = action.payload
    },
    setPage(state, action) {
      state.page = action.payload
    },
    setSize(state,action) {
      state.size = action.payload
    }
  }
})

export const { setSelectedOrder, setPage, setSize } = orderSlice.actions
export default orderSlice.reducer
