
import React, { ComponentType } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";

const PublicRoute = () => {
  // const { token } = useAppSelector((state) => state.user);
  return <Outlet />;
  // return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
