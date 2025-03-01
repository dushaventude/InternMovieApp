import React, { ComponentType } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../store";

const PublicRoute = ({ component: Component, ...rest }: { component: ComponentType<any> }) => {
  const { token } = useAppSelector((state) => state.user);

  return (
    <Routes>
      <Route
        {...rest}
        element={!token ? <Component /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default PublicRoute;


