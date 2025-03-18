import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoute from "./modules/auth/routes/AuthRoute";
import Login from "./modules/auth/components/login/Login";
import Layout from "./layout/layout/Layout";
import Sales from "./modules/sales/Sales";
import SaleOrder from "./modules/sales/sale-order/SaleOrder";

const App = () => {
  debugger;
  const isAuthenticated = !!sessionStorage.getItem("authToken");

  return (
    <Routes>
      {/* Public Route for Login */}
      <Route path="/auth/login" element={<Login />} />

      {/* Default Route: Redirect to /sales if authenticated, else to /auth/login */}
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? "/sales" : "/auth/login"} replace />
        }
      />

      {/* Protected Routes */}
      <Route
        element={
          <AuthRoute>
            <Layout />
          </AuthRoute>
        }
      >
        <Route path="/sales" element={<Sales />} />
        <Route path="/sales/orders/sale-order" element={<SaleOrder />} />
      </Route>

      {/* Catch-all Route: Redirect to /sales or /auth/login */}
      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? "/sales" : "/auth/login"} replace />
        }
      />
    </Routes>
  );
};

export default App;