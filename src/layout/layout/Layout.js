import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNavbar from "../side-navbar/SideNavbar";
import TopNavbar from "../top-navbar/TopNavbar";
import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import { menuData } from "../menuData";

const Layout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
    const isAuthenticated = !!sessionStorage.getItem("authToken");
    const location = useLocation();

    // Close sidebar when switching to mobile view
    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false);
        } else {
            setIsSidebarOpen(true);
        }
    }, [isMobile]);

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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Box sx={{ display: "inherit" }}>
            <CssBaseline />
            {isAuthenticated && (
                <SideNavbar
                    isAuthenticated={isAuthenticated}
                    isSidebarOpen={isSidebarOpen}
                    onSidebarToggle={setIsSidebarOpen}
                    isMobile={isMobile}
                />
            )}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    transition: theme.transitions.create("margin", {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    marginLeft: isAuthenticated
                        ? isMobile
                            ? 0
                            : isSidebarOpen
                                ? "240px"
                                : "60px"
                        : 0,
                    paddingTop: "60px", // Space for top navbar
                    minHeight: "100vh",
                    [theme.breakpoints.down("md")]: {
                        marginLeft: 0,
                    },
                }}
            >
                {isAuthenticated && (
                    <TopNavbar
                        selectedMenu={selectedMenu}
                        isSidebarOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                        isMobile={isMobile}
                    />
                )}
                <Box sx={{ p: { xs: 1, sm: 3 } }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;