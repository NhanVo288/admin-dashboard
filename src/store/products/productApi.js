import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://26.100.40.164:8181/api",
    prepareHeaders: (header) => {
      const token = localStorage.getItem("accessToken");
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
  tagTypes: ["Product", "Category"],

  endpoints: (builder) => ({

    // ================= PRODUCT =================

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

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
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
        { type: "Product", id },
        { type: "Product", id: "LIST" },
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
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    searchProducts: builder.query({
      query: (params) => ({
        url: "/products/search",
        params,
      }),
    }),

    // ================= CATEGORY =================

    getCategories: builder.query({
      query: () => "/categories",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Category",
                id,
              })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),

    getCategoryById: builder.query({
      query: (id) => `/categories/${id}`,
      providesTags: (result, error, id) => [
        { type: "Category", id },
      ],
    }),

    createCategory: builder.mutation({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Tạo danh mục thành công");
        } catch {}
      },
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    updateCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Cập nhật danh mục thành công");
        } catch {}
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Xóa danh mục thành công");
        } catch {}
      },
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

  }),
});

export const {
  // Product
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,

  // Category
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

} = productApi;