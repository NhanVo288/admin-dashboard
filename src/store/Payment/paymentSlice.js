import { createSlice } from "@reduxjs/toolkit";


const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        page: 0,
        size: 10
    },
    reducers: {
        setPage: (state,action) => {
            state.page = action.payload
        },
        setSize: (state,action) => {
            state.size = action.payload
        }
    }
})

export const { setPage, setSize } = paymentSlice.actions

export default paymentSlice.reducer