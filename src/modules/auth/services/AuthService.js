const AuthService = {
    login: async (username, password) => {
      if (username === "admin" && password === "password") {
        localStorage.setItem("auth", "true"); // Store authentication state
        return true;
      }
      return false;
    },
  
    logout: () => {
      localStorage.removeItem("auth");
    },
  
    isAuthenticated: () => {
      return localStorage.getItem("auth") === "true";
    }
  };
  
  export default AuthService;