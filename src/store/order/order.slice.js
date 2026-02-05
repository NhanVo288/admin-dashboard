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
    }
  }
})

export const { setSelectedOrder, setPage } = orderSlice.actions
export default orderSlice.reducer
