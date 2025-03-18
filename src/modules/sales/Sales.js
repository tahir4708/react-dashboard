import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../auth/services/AuthService";

const Sales = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/auth/login");
  };

  return (
    <div>
      <h2>Welcome to Sales Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sales;
