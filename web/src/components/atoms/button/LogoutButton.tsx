import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/features/user/authSlice";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    // Clear any other relevant data, such as localStorage or cookies
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;