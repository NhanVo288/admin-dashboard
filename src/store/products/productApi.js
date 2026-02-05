import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://26.100.40.164:8181/api",
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
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 0, size = 10 }) => ({
        url: "/products",
        params: { page, size },
      }),
      providesTags: (result) =>
        result?.content
          ? [
              ...result.content.map(({ id }) => ({
                type: "Product",
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Tạo sản phẩm thành công");
        } catch {}
      },
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Cập nhật sản phẩm thành công");
        } catch {}
      },
      invalidatesTags: (result, error, { id }) => [
        {
          type: "Product",
          id,
        },
      ],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Xóa sản phẩm thành công");
        } catch {}
      },
      invalidatesTags: [{type: 'Product', id: 'LIST'}]
    }),

    searchProducts: builder.query({
      query: (params) => ({
        url: "/products/search",
        params,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
