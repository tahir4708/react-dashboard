import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaInfoCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
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
} from "@mui/material";
import AuthService from "../../modules/auth/services/AuthService";

const TopNavbar = ({ selectedMenu, isSidebarOpen }) => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme(); // Access the current theme

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
  };

  // Determine text and icon color based on background
  const textColor = theme.palette.mode === "dark" ? "white" : "black";
  const iconColor = theme.palette.mode === "dark" ? "white" : "black";

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
          <span
            className={`arrow ${openDropdownId === menu.id ? "open" : ""}`}
            style={{ marginLeft: "5px", transition: "transform 0.3s" }}
          ></span>
        </Typography>
        {openDropdownId === menu.id && (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMouseLeave}
            MenuListProps={{
              onMouseEnter: () => setOpenDropdownId(menu.id), // Keep dropdown open when mouse enters
              onMouseLeave: handleMouseLeave, // Close dropdown when mouse leaves
            }}
            sx={{
              marginTop: "8px",
              "& .MuiPaper-root": {
                backgroundColor: theme.palette.mode === "dark" ? "#333" : "#f9f9f9",
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
        left: isSidebarOpen ? "200px" : "60px",
        width: `calc(100% - ${isSidebarOpen ? "200px" : "60px"})`,
        transition: "left 0.3s",
        backgroundColor: theme.palette.mode === "dark" ? "#333" : "#f9f9f9",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {selectedMenu?.children?.map((child) => renderMenu(child))}
        </Box>
        <IconButton onClick={handleLogout} sx={{ color: textColor }}>
          <FaSignOutAlt size={20} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;