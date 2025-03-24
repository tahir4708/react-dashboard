import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AuthRoute from "./modules/auth/routes/AuthRoute";
import Login from "./modules/auth/components/login/Login";
import Layout from "./layout/layout/Layout";
import Sales from "./modules/sales/Sales";
import SaleOrder from "./modules/sales/sale-order/SaleOrder";
import Dashboard from "./modules/dashboard/dashboard";

const App = () => {
    const isAuthenticated = !!sessionStorage.getItem("authToken");

    return (
        <Routes>
            {/* Public Route for Login */}
            <Route path="/auth/login" element={<Login />} />

            {/* Default Route */}
            <Route
                path="/"
                element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth/login"} replace />}
            />

            {/* Layout wrapper for all authenticated routes */}
            <Route
                element={
                    <AuthRoute>
                        <Layout>
                            <Outlet /> {/* This renders the child routes */}
                        </Layout>
                    </AuthRoute>
                }
            >
                {/* Protected Routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/sales/orders/sale-order" element={<SaleOrder />} />

                {/* Catch-all Route WITH Layout */}
                <Route
                    path="*"
                    element={
                        isAuthenticated ? (
                            <div style={{ flex: 1 }}>
                                {/* Empty content but keeps layout */}
                            </div>
                        ) : (
                            <Navigate to="/auth/login" replace />
                        )
                    }
                />
            </Route>
        </Routes>
    );
};

export default App;