import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../side-navbar/SideNavbar";
import TopNavbar from "../top-navbar/TopNavbar";
import { Box, CssBaseline } from "@mui/material";

const Layout = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAuthenticated = !!sessionStorage.getItem("authToken");

  const handleSidebarToggle = (open) => {
    setIsSidebarOpen(open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline /> {/* Normalize CSS */}
      <SideNavbar
        onMenuSelect={setSelectedMenu}
        isAuthenticated={isAuthenticated}
        onSidebarToggle={handleSidebarToggle}
        isSidebarOpen={isSidebarOpen}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: "margin-left 0.3s ease",
          marginLeft: isSidebarOpen ? "200px" : "60px", // Adjust based on sidebar state
          paddingTop: "60px", // Space for the top navbar
          paddingLeft: "20px",
          paddingRight: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // Align content to the top
          minHeight: "100vh", // Ensure full height
          overflowX: "hidden",
        }}
      >
        {isAuthenticated && (
          <TopNavbar selectedMenu={selectedMenu} isSidebarOpen={isSidebarOpen} />
        )}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start", // Align content to the top
            paddingTop: "20px", // Add padding to avoid overlap with top navbar
          }}
        >
          <Outlet /> {/* Render nested routes here */}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;