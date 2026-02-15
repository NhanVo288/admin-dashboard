import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://26.100.40.164:8181/api",
    prepareHeaders: (header) => {
      const token = localStorage.getItem("tokenAccess");
      const userId = localStorage.getItem("userId");

      if (token) {
        header.set("Authorization", `Bearer ${token}`);
      }
      if (userId) {
        header.set("X-User-Id", userId);
      }
    },
  }),
  tagTypes: ["Payment"],
  endpoints: (build) => ({
    getAllPayment: build.query({
      query: ({ page = 0, size = 10 }) => ({
        url: "/payments",
        params: { page, size },
      }),
      providesTags: (result) => 
        result?.content ? 
      [
        ...result.content.map(({id}) => ({
            type: 'Payment',
            id
        }))
      ]: [{type: 'Payment', id: 'LIST'}]
    }),
    refundPayment: build.mutation({
        query: (id) => ({
            url: `/payments/${id}/refund`,
            method: 'POST'
        })
    })
  }),
});

export const {
    useGetAllPaymentQuery,
    useRefundPaymentMutation
} = paymentApi
