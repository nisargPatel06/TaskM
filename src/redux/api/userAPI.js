import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_USER_BASE_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getAllUsers: builder.query({ query: () => "/" }),
  }),
});

export const { useGetAllUsersQuery } = userAPI;
