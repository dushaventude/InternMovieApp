import React, { Component } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";


const AdminRoute = () => {
  const { token, role } = useAppSelector((state) => state.user);

  return token && role.includes("admin") ? <AdminDashboard><Outlet /> </AdminDashboard>: <Navigate to="/login" replace />;
};

export default AdminRoute;
