import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({ page = 0, size = 10 }) => ({
        url: "/users",
        params: { page, size },
      }),
      providesTags: (result) =>
        result?.content
          ? [
              ...result.content.map(({ id }) => ({
                type: "User",
                id,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/users/${id}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserByIdQuery,
  useUpdateUserRoleMutation,
} = userApi;
