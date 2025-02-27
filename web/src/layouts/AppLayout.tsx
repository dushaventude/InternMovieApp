import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/molecules/Footer/Footer";
import Header from "../components/molecules/Header/Header";

const AppLayout: React.FC = () => {
  const { pathname } = useLocation();

  if (pathname.includes("dashboard")) return <Outlet />;

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
