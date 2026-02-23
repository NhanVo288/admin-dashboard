import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const inventoryApi = createApi({
  reducerPath: "inventoryApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    prepareHeaders: (header) => {
      const token = localStorage.getItem("tokenAccess");
      const userId = localStorage.getItem("userId");

      if (token) {
        header.set("Authorization", `Bearer ${token}`);
      }
      if (userId) {
        header.set("X-User-Id", userId);
      }
      return header;
    },
  }),

  tagTypes: ["Inventory", "Transaction"],

  endpoints: (builder) => ({
    // GET INVENTORY

    getInventory: builder.query({
      query: (productId) => `/inventory/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Inventory", id: productId },
      ],
    }),

    // GET TRANSACTIONS

    getTransactions: builder.query({
      query: ({ page = 0, size = 10 }) => ({
        url: "/inventory/transactions",
        params: { page, size },
      }),

      providesTags: (result) =>
        result?.content
          ? [
              ...result.content.map((item) => ({
                type: "Transaction",
                id: item.id,
              })),
              { type: "Transaction", id: "LIST" },
            ]
          : [{ type: "Transaction", id: "LIST" }],
    }),

    // RESERVE

    reserveInventory: builder.mutation({
      query: (body) => ({
        url: "/inventory/reserve",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, body) => [
        { type: "Inventory", id: body.productId },
        { type: "Transaction", id: "LIST" },
      ],
    }),

    // RELEASE

    releaseReservation: builder.mutation({
      query: (orderId) => ({
        url: `/inventory/release`,
        method: "POST",
        params: { orderId },
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),

    // CONFIRM

    confirmReservation: builder.mutation({
      query: (orderId) => ({
        url: `/inventory/confirm`,
        method: "POST",
        params: { orderId },
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),

    // RESTOCK

    restock: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/inventory/${productId}/restock`,
        method: "PUT",
        params: { quantity },
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Inventory", id: productId },
        { type: "Transaction", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetInventoryQuery,
  useGetTransactionsQuery,
  useReserveInventoryMutation,
  useReleaseReservationMutation,
  useConfirmReservationMutation,
  useRestockMutation,
} = inventoryApi;
