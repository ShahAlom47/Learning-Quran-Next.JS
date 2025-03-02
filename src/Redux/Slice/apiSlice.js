import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ Create a dynamic API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }), 
  endpoints: (builder) => ({
    
    // 🔹 Dynamic GET Request
    getData: builder.query({
       
      query: (endpoint) => `${endpoint}`, 
    }),

  }),
});

// ✅ Export auto-generated hooks
export const { useGetDataQuery } = apiSlice;
