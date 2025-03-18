import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../side-navbar/SideNavbar";
import TopNavbar from "../top-navbar/TopNavbar";
import "./Layout.css";

const Layout = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAuthenticated = !!sessionStorage.getItem("authToken");

  const handleSidebarToggle = (open) => {
    setIsSidebarOpen(open);
  };

  return (
    <div className="layout-container">
      <SideNavbar
        onMenuSelect={setSelectedMenu}
        isAuthenticated={isAuthenticated}
        onSidebarToggle={handleSidebarToggle}
      />
      <div className="main-content">
        {isAuthenticated && <TopNavbar selectedMenu={selectedMenu} isSidebarOpen={isSidebarOpen} />}
        <div className="page-content">
          <Outlet /> {/* Render nested routes here */}
        </div>
      </div>
    </div>
  );
};

export default Layout;