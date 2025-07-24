import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ requiredRoleId = 2 }) => {
  // 2 = Employee by default
  const { auth, isAuthenticated, isLoading } = useContext(AuthContext);
  const [loadingRole, setLoadingRole] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!auth?.roleId) {
      setAllowed(false);
      setLoadingRole(false);
      return;
    }
    const userRoleId = Number(auth.roleId);
    setAllowed(userRoleId === requiredRoleId);
    setLoadingRole(false);
  }, [auth?.roleId, requiredRoleId]);

  if (isLoading || loadingRole) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowed) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-bold text-red-600">
        Not Authorized
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
