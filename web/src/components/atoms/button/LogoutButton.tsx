import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/features/user/authSlice";
import { persistor } from "../../../store";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    // Clear any other relevant data, such as localStorage or cookies
    localStorage.removeItem("token");
    persistor.purge();
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        marginTop: "auto",
        border: "none",
        fontSize: "16px",
        fontFamily: "Roboto,serif",
        textTransform: "uppercase",
        borderRadius: "20px",
        padding: "4px 8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
        color: "#eee",
        background:
          "linear-gradient(to right,rgb(54, 53, 47),rgb(107, 103, 65)",
      }}
    >
      Logout
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className=""
        style={{ height: "16px", transform: "rotate(180deg)" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
        />
      </svg>
    </button>
  );
};

export default LogoutButton;
