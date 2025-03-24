import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNavbar from "../side-navbar/SideNavbar";
import TopNavbar from "../top-navbar/TopNavbar";
import { Box, CssBaseline } from "@mui/material";
import {menuData} from "../menuData";


const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isAuthenticated = !!sessionStorage.getItem("authToken");
    const location = useLocation();

    // Find the current active menu based on path
    const findSelectedMenu = () => {
        // First check for exact matches in children
        for (const menu of menuData) {
            if (menu.children) {
                for (const child of menu.children) {
                    if (location.pathname === child.path) {
                        return menu;
                    }
                    // Check grand-children if they exist
                    if (child.children) {
                        for (const grandChild of child.children) {
                            if (location.pathname === grandChild.path) {
                                return menu;
                            }
                        }
                    }
                }
            }
            // Then check for partial matches
            if (location.pathname.startsWith(menu.path)) {
                return menu;
            }
        }
        return null;
    };

    const selectedMenu = findSelectedMenu();

    return (
        <Box sx={{ display: "inherit" }}>
            <CssBaseline />
            {isAuthenticated && (
                <SideNavbar
                    isAuthenticated={isAuthenticated}
                    onSidebarToggle={setIsSidebarOpen}
                />
            )}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    transition: "margin-left 0.3s ease",
                    marginLeft: isAuthenticated ? (isSidebarOpen ? "240px" : "60px") : 0,
                    paddingTop: "60px", // Space for top navbar
                    minHeight: "100vh",
                }}
            >
                {isAuthenticated && (
                    <TopNavbar
                        selectedMenu={selectedMenu}
                        isSidebarOpen={isSidebarOpen}
                    />
                )}
                <Box sx={{ p: 3 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;