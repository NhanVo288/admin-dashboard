import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";

export const CartApi = createApi({
  reducerPath: "cartApi",
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
      return header
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (build) => ({
    getCartById: build.query({
      query: (id) => `/carts/${id}`,
      providesTags: ["Cart"],
    }),
  }),
});

export const { useGetCartById } = CartApi;
