import React, { Children } from "react";
import "./styles.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LogoutButton from "../../components/atoms/button/LogoutButton";

interface AdminDashboardProps {
  children: React.ReactNode;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({children}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleHeaderclick = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <p className="dashboard-title" onClick={handleHeaderclick}>Movie Hub</p>
        <div className="dashboard-header-center">
          <p>Movie Hub</p>
          <p>Admin Dashboard</p>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="user-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
      </div>
      <div className="dashboard-body">
        <div className="dashboard-sidebar">
          <div className="sidebar-header">
            <p>Admin Panel</p>
          </div>
          <div className="sidebar-navigation">
          

            <p
              onClick={() => navigate("movies")}
              style={{
                backgroundColor: pathname.includes("movies") ? "#333" : "",
              }}
              >
              Manage Movies
            </p>
            <p
              onClick={() => navigate("actors")}
              style={{
                backgroundColor: pathname.includes("actors") ? "#333" : "",
              }}
              >
              Manage Actors
            </p>
             
            <LogoutButton/>
          </div>
        </div>
        <div className="dashboard-content">
          {/* <Outlet /> */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
