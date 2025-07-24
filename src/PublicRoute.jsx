import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./context/AuthContext";

const PublicRoute = () => {
  const { isAuthenticated, isLoading, auth } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>; // Or a proper spinner component
  }

  // Determine where to redirect an already authenticated user
  const getRedirectUrl = () => {
    if (!isAuthenticated) return null;
    const roleId = Number(auth.roleId);
    if (roleId === 2) return "/sup-all-tasks";
    if (roleId === 3) return "/emp-dashboard";
    return "/"; // A fallback authenticated route
  };

  const redirectUrl = getRedirectUrl();

  // If authenticated, redirect away from public pages. Otherwise, show the page.
  return isAuthenticated ? <Navigate to={redirectUrl} replace /> : <Outlet />;
};

export default PublicRoute;
