import React from "react";
import { Outlet } from "react-router-dom";
import Link from "../components/atoms/Link";
import Footer from "../components/molecules/Footer/Footer";
import Header from "../components/molecules/Header/Header";

interface AppLayoutProps {
  string: string;
}

const AppLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
