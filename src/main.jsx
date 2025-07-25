import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

// Layouts, Pages & Components
import Layout from "./Layout.jsx";
import Login from "./components/pages/Login.jsx";
import Dashboard from "./components/empPages/Dashboard.jsx";
import Tasks from "./components/empPages/Tasks.jsx";
import TimeTracking from "./components/empPages/TimeTracking.jsx";
import Queries from "./components/empPages/Queries.jsx";
import Reports from "./components/empPages/Reports.jsx";
import AllTasks from "./components/supPages/AllTasks.jsx";
import AllQueries from "./components/supPages/AllQueries.jsx";
import AddTask from "./components/supPages/AddTask.jsx"; // Import AddTask
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Auth
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import AuthContext from "./context/AuthContext.js";

// Component to handle redirection for already logged-in users
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  if (isLoading) return <div>Loading...</div>;
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

// Component to redirect user to their specific dashboard from the root path
const HomeRedirect = () => {
  const { auth } = useContext(AuthContext);
  const roleId = Number(auth.roleId);

  if (roleId === 1) return <Navigate to="/admin-dashboard" replace />;
  if (roleId === 2) return <Navigate to="/sup-all-tasks" replace />;
  if (roleId === 3) return <Navigate to="/emp-dashboard" replace />;

  // Fallback if role is not found
  return <Navigate to="/login" replace />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public routes (no layout/sidebar) */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Protected routes (with layout/sidebar) */}
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomeRedirect />} />
          {/* Employee Routes: roleId 3 */}
          <Route path="emp-dashboard" element={<Dashboard />} />
          <Route path="emp-tasks" element={<Tasks />} />
          <Route path="emp-time-tracking" element={<TimeTracking />} />
          <Route path="emp-queries" element={<Queries />} />
          <Route path="emp-reports" element={<Reports />} />
          {/* Superior Routes: roleId 2 */}
          <Route path="sup-all-tasks" element={<AllTasks />} />
          <Route path="sup-all-queries" element={<AllQueries />} />
          <Route path="sup-add-task" element={<AddTask />} />{" "}
          {/* Add Task Route */}
          {/* Admin Routes: roleId 1 */}
          <Route path="admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Fallback for any unmatched route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </Provider>
  </StrictMode>
);
