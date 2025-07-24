import React, { useEffect } from "react";
import { Sidebar } from "./components";
import { Outlet, useLocation } from "react-router-dom";
import AuthContextProvider from "./context/AuthContextProvider";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // List of routes where Sidebar should be hidden
  const hideSidebarRoutes = ["/login", "/register"];

  return (
    <AuthContextProvider>
      <div className="flex h-screen bg-gray-50">
        {!hideSidebarRoutes.includes(pathname) && <Sidebar />}
        <Outlet />
      </div>
    </AuthContextProvider>
  );
};

export default Layout;
