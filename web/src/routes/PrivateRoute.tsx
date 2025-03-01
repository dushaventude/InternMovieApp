import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../store";
import { ComponentType } from "react";

const PrivateRoute = ({ component: Component, ...rest }: { component: ComponentType<any>; [key: string]: any }) => {
  const { token, role } = useAppSelector((state) => state.user);

  return (
    <Routes>
      <Route
        {...rest}
        element={token && role.includes("admin") ? <Component /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default PrivateRoute;


