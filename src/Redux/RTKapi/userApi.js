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
      query: () => "/api/moderator/users/get_all_user",
      providesTags: ["Users"],
    }),

    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/api/moderator/users/updateUserRole`, // ✅ API ইউআরএল ঠিক করা হয়েছে
        method: "PATCH",
        body: {userId:id,newRole:role},
      }),
      invalidatesTags: ["Users"], // ✅ আপডেটের পর ইউজার লিস্ট রিফ্রেশ হবে
    }),
  }),
});

// ✅ সঠিকভাবে এক্সপোর্ট করা
export const { useGetUsersQuery, useUpdateUserRoleMutation } = userApi;
