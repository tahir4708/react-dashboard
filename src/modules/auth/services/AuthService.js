import { useNavigate } from "react-router-dom";

const AuthService = {

    // Simulates API call to backend
    login: async (username, password) => {
        try {
            // In a real app, this would be a fetch/axios call to your backend
            // const response = await fetch('/api/auth/login', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ username, password })
            // });

            // Mock response - replace with actual API call
            if (username === "admin" && password === "password") {
                const token = "mock_jwt_token_" + Math.random().toString(36).substring(2);
                const expiresIn = 3600 * 1000; // 1 hour

                localStorage.setItem("authToken", token);
                localStorage.setItem("authTokenExpiry", Date.now() + expiresIn);
                localStorage.setItem("username", username);

                return { success: true, token };
            }

            throw new Error("Invalid credentials");
        } catch (error) {
            console.error("Login failed:", error);
            return { success: false, error: error.message };
        }
    },

    logout: (navigate) => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenExpiry");
        localStorage.removeItem("username");
    },

    isAuthenticated: () => {
        const token = localStorage.getItem("authToken");
        const expiry = localStorage.getItem("authTokenExpiry");

        // Check if token exists and hasn't expired
        return token && expiry && Date.now() < parseInt(expiry);
    },

    // Optional: Get current user
    getCurrentUser: () => {
        if (AuthService.isAuthenticated()) {
            return {
                username: localStorage.getItem("username"),
                token: localStorage.getItem("authToken")
            };
        }
        return null;
    },

    // Optional: Auto-logout when token expires
    initializeTokenWatch: (navigate) => {
        const checkToken = () => {
            if (!AuthService.isAuthenticated()) {
                AuthService.logout(navigate);
            }
        };

        // Check every minute
        setInterval(checkToken, 60000);
        return checkToken;
    }
};

export default AuthService;