import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import { LandingPage } from "./components";
import Dashboard from "./components/empPages/Dashboard.jsx";
import Tasks from "./components/empPages/Tasks.jsx";
import TimeTracking from "./components/empPages/TimeTracking.jsx";
import Queries from "./components/empPages/Queries.jsx";
import Reports from "./components/empPages/Reports.jsx";
import Login from "./components/pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AllTasks from "./components/supPages/AllTasks.jsx";
import AllQueries from "./components/supPages/AllQueries.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<LandingPage />} />
      <Route element={<ProtectedRoute requiredRoleId={3} />}>
        <Route path="/emp-dashboard" element={<Dashboard />} />
        <Route path="/emp-tasks" element={<Tasks />} />
        <Route path="/emp-time-tracking" element={<TimeTracking />} />
        <Route path="/emp-queries" element={<Queries />} />
        <Route path="/emp-reports" element={<Reports />} />
      </Route>
      <Route element={<ProtectedRoute requiredRoleId={2} />}>
        <Route path="/sup-all-tasks" element={<AllTasks />} />
        <Route path="/sup-all-queries" element={<AllQueries />} />
      </Route>

      <Route element={<ProtectedRoute requiredRoleId={1} />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
