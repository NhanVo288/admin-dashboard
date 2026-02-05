import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const orderApi = createApi({
  reducerPath: "orderApi",
  tagTypes: ["Order"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8181", 
    prepareHeaders: (headers, { getState }) => {
  const state = getState();
  const token = state.auth.accessToken;
  const userId = state.auth.userId;

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (userId) {
    headers.set("X-User-Id", userId);
  }

  return headers;
},

  }),
  endpoints: (builder) => ({

   

    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: (r, e, id) => [{ type: "Order", id }]
    }),

    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body
      }),
      invalidatesTags: ["Order"]
    }),

    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/cancel`,
        method: "PUT"
      }),
      invalidatesTags: (r, e, id) => [{ type: "Order", id }]
    }),

    getAllOrders: builder.query({
      query: ({ page = 0, size = 10 }) =>
        `/orders?page=${page}&size=${size}`,
      providesTags: ["Order"]
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status, notes }) => ({
        url: `/orders/${id}/status`,
        method: "PUT",
        body: { status, notes }
      }),
      invalidatesTags: (r, e, { id }) => [{ type: "Order", id }]
    }),

    getOrderStatusHistory: builder.query({
      query: (id) => `/orders/${id}/status-history`
    })
  })
})

export const {
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useCancelOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetOrderStatusHistoryQuery
} = orderApi
