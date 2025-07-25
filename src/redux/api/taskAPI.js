import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskAPI = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5298/api/Task",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (taskData) => ({
        url: "/",
        method: "POST",
        body: taskData,
      }),
      // When a task is added, invalidate the 'Users' tag.
      // This will cause any query that provides the 'Users' tag (like getUnassignedEmployees) to refetch.
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useAddTaskMutation } = taskAPI;
