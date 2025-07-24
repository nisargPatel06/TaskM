import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Define role access for routes
const routeRoles = {
  "/emp-dashboard": [3],
  "/emp-tasks": [3],
  "/emp-time-tracking": [3],
  "/emp-queries": [3],
  "/emp-reports": [3],
  "/sup-all-tasks": [2],
  "/sup-all-queries": [2],
  "/admin-dashboard": [1],
};

const ProtectedRoute = () => {
  const { auth, isAuthenticated, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userRoleId = Number(auth.roleId);
  const requiredRoles = routeRoles[location.pathname];

  // For the root path, just being authenticated is enough
  if (location.pathname === "/") {
    return <Outlet />;
  }

  // If the route has specific role requirements, check them
  if (requiredRoles && !requiredRoles.includes(userRoleId)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold text-red-600">Not Authorized</h1>
        <p className="mt-2 text-gray-600">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
