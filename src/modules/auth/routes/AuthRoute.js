import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = ({ children }) => {
  debugger;
  const isAuthenticated = !!sessionStorage.getItem("authToken");

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth/login" replace />;
  }

  // Render the protected routes
  return children ? children : <Outlet />;
};

export default AuthRoute;