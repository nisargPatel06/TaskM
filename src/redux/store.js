import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import { authAPI } from "./api/authAPI";
import { taskAPI } from "./api/taskAPI";

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [taskAPI.reducerPath]: taskAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAPI.middleware,
      authAPI.middleware,
      taskAPI.middleware
    ),
});
