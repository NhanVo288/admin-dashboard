import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";


export const CartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://26.100.40.164:8181/api",
        prepareHeaders: (headers, {getState}) => {
            const state = getState()
            const token = state.auth.accessToken
            const userId = state.auth.userId

            if(token){
                headers.set("Authorization", `Bearer ${token}`)
            }
            if(userId){
                headers.set("X-User-Id", userId)
            }
            return headers
        }
    }),
    tagTypes: ["Cart"],
    endpoints: build => ({
        getCartById: build.query({
            query: (id) => `/carts/${id}`,
            providesTags: ["Cart"]
        })
    })
})

export const {
    useGetCartById
} = CartApi