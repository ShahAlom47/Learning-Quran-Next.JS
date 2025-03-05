import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token; // যদি টোকেন ব্যবহার করা হয়
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Users"],

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page = 1, limit = 5, search = "", userType = "all" }) => ({
        url: `/api/moderator/users/get_all_user?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}&userType=${userType}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    getUser: builder.query({
      query: ({userId }) => ({
        url: `/api/moderator/users/get_user`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/api/moderator/users/updateUserRole`,
        method: "PATCH",
        body: { userId: id, newRole: role },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

// ✅ সঠিকভাবে এক্সপোর্ট করা
export const { useGetUsersQuery,useGetUserQuery, useUpdateUserRoleMutation } = userApi;
