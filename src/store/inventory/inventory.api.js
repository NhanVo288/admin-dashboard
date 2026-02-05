import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const inventoryApi = createApi({
  reducerPath: "inventoryApi",
  baseQuer: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
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
  tagTypes: ["Inventory"],
  endpoints: (builder) => ({
    getInventory: builder.query({
      query: (productId) => `/inventories/${productId}`,
      providesTags: (result, error, productId) => [
        {
          type: "Inventory",
          id: productId,
        },
      ],
    }),
    reserveInventory: builder.mutation({
        query: (body) => ({
            url: '/inventories/reserve',
            method: 'POST',
            body
        }),
        invalidatesTags: (result, error, body) => [
            {type:'Inventory', id: body.productId}
        ]
    })
  }),
    
});

export const {
  useGetInventoryQuery,
  useReserveInventoryMutation,
} = inventoryApi;