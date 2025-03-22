import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import "../../../../common/css/global.css"; // Import global CSS (if needed)

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login logic
    sessionStorage.setItem("authToken", "dummy-token");
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)", // Gradient background
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          borderRadius: "8px",
          backgroundColor: "white",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <form>
          <Box sx={{ marginBottom: "1.5rem" }}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
              required
            />
          </Box>
          <Box sx={{ marginBottom: "1.5rem" }}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              required
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{
              padding: "0.75rem",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;