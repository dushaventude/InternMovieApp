

import React, { ComponentType } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";

const PrivateRoute = () => {
  const { token } = useAppSelector((state) => state.user);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
