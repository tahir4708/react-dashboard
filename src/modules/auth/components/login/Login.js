import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../../common/css/global.css"; // Import global CSS
import "./Login.css"; // Import component-specific CSS

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login logic
    sessionStorage.setItem("authToken", "dummy-token");
    navigate("/sales");
  };

  return (
    <div className="gradient-background">
      <div className="white-container">
        <h1 className="login-heading">Login</h1>
        <form>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="button"
            className="custom-btn" // Reusable button class
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;