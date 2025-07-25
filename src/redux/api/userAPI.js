import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_USER_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Use optional chaining to safely access the token
      const token = getState().auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // Add tagTypes for caching and automatic refetching
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/",
      providesTags: ["Users"],
    }),
    // New endpoint to get employees with no tasks assigned
    getUnassignedEmployees: builder.query({
      query: () => "/unassigned",
      providesTags: ["Users"],
    }),
  }),
});

// Export the new hook alongside the existing one
export const { useGetAllUsersQuery, useGetUnassignedEmployeesQuery } = userAPI;
