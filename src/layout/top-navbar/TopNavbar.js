import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import {
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
    useTheme,
    Button,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import AuthService from "../../modules/auth/services/AuthService";

const TopNavbar = ({ selectedMenu, isSidebarOpen, toggleSidebar, isMobile }) => {
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const textColor = theme.palette.mode === "dark" ? "white" : "black";
    const iconColor = theme.palette.mode === "dark" ? "white" : "black";

    const handleMouseEnter = (id, event) => {
        setOpenDropdownId(id);
        setAnchorEl(event.currentTarget);
    };

    const handleMouseLeave = () => {
        setOpenDropdownId(null);
        setAnchorEl(null);
    };

    const handleLogout = () => {
        AuthService.logout();
        window.location.reload();
    };

    const renderMenu = (menu) => {
        if (!menu.children || menu.children.length === 0) {
            return (
                <MenuItem
                    key={menu.id}
                    component={Link}
                    to={menu.path}
                    sx={{ color: textColor }}
                >
                    <ListItemIcon sx={{ color: iconColor }}>{menu.icon}</ListItemIcon>
                    <ListItemText>{menu.title}</ListItemText>
                </MenuItem>
            );
        }

        return (
            <Box
                key={menu.id}
                onMouseEnter={(e) => handleMouseEnter(menu.id, e)}
                onMouseLeave={handleMouseLeave}
                sx={{ position: "relative" }}
            >
                <Typography
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        color: textColor,
                        padding: "8px 16px",
                        "&:hover": {
                            background:
                                theme.palette.mode === "dark"
                                    ? "linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))"
                                    : "linear-gradient(90deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05))",
                        },
                    }}
                >
                    {menu.icon} {menu.title}
                </Typography>
                {openDropdownId === menu.id && (
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMouseLeave}
                        MenuListProps={{
                            onMouseEnter: () => setOpenDropdownId(menu.id),
                            onMouseLeave: handleMouseLeave,
                        }}
                        sx={{
                            marginTop: "8px",
                            "& .MuiPaper-root": {
                                backgroundColor:
                                    theme.palette.mode === "dark" ? "#333" : "#f9f9f9",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                borderRadius: "4px",
                            },
                        }}
                    >
                        {menu.children.map((child) => renderMenu(child))}
                    </Menu>
                )}
            </Box>
        );
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                left: isMobile ? 0 : isSidebarOpen ? "240px" : "60px",
                width: isMobile
                    ? "100%"
                    : `calc(100% - ${isSidebarOpen ? "240px" : "60px"})`,
                transition: theme.transitions.create(["left", "width"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                backgroundColor:
                    theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
                boxShadow: "none",
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingRight: "16px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "100%",
                        overflow: "hidden",
                    }}
                >
                    {isMobile && (
                        <Button
                            startIcon={<MenuIcon />}
                            onClick={toggleSidebar}
                            sx={{
                                minWidth: 'auto',
                                padding: '8px',
                                borderRadius: '4px',
                                color: textColor,
                                backgroundColor: theme.palette.mode === 'dark' ?
                                    'rgba(255,255,255,0.89)' :
                                    'rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: theme.palette.mode === 'dark' ?
                                        'rgba(255,255,255,0.89)' :
                                        'rgba(0, 0, 0, 0.2)',
                                },
                                mr: 2,
                            }}
                        >

                        </Button>
                    )}
                    {selectedMenu?.children?.length > 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                ml: isMobile ? 0 : 2,
                                flexGrow: 1,
                                overflowX: "auto",
                                scrollbarWidth: "none",
                                "&::-webkit-scrollbar": {
                                    display: "none",
                                },
                            }}
                        >
                            {selectedMenu.children.map((child) => renderMenu(child))}
                        </Box>
                    )}
                </Box>

                <Box sx={{ flexShrink: 0, marginLeft: "auto" }}>
                    <IconButton
                        onClick={handleLogout}
                        sx={{
                            color: textColor,
                            "&:hover": {
                                backgroundColor: theme.palette.action.hover,
                            },
                        }}
                    >
                        <FaSignOutAlt size={20} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopNavbar;