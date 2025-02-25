import React from "react";
import { Outlet } from "react-router-dom";
import Link from "../components/atoms/Link";
import Footer from "../components/molecules/Footer/Footer";

interface AppLayoutProps {
  string: string;
}

const AppLayout: React.FC = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="">Home</Link>
          </li>
          <li>
            <Link href="login">Login</Link>
          </li>
          <li>
            <Link href="register">Register</Link>
          </li>
          <li>
            <Link href="movies">Movies</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
