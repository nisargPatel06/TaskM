import React, { useEffect } from "react";
import { Header, Footer } from "./components";
import { Outlet, useLocation } from "react-router-dom";
import AuthContextProvider from "./context/AuthContextProvider";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AuthContextProvider>
      <Header />
      <Outlet />
      <Footer />
    </AuthContextProvider>
  );
};

export default Layout;
