import { createSlice } from "@reduxjs/toolkit";


const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        page: 0,
        size: 10,
    },
    reducers: {
        setPage: (state,action) => {
            state.page = action.payload
        },
        setSize: (state, action) => {
            state.size = action.payload
        }
    }
})

export const { setPage, setSize } = inventorySlice.actions
export default inventorySlice.reducer