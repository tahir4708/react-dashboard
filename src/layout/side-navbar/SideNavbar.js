import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  useTheme,
  IconButton,
} from "@mui/material";
import { ChevronLeft, Menu } from "@mui/icons-material";
import { menuData } from "../menuData";

const SideNavbar = ({
                      isAuthenticated,
                      isSidebarOpen,
                      onSidebarToggle,
                      isMobile,
                    }) => {
  const theme = useTheme();
  const location = useLocation();

  const handleSidebarHover = (open) => {
    if (!isMobile) {
      onSidebarToggle(open);
    }
  };

  const handleSidebarToggle = () => {
    onSidebarToggle(!isSidebarOpen);
  };

  const iconColor = theme.palette.mode === "dark" ? "white" : "black";

  // Check if menu or any of its children is active
  const isMenuActive = (menu) => {
    if (location.pathname === menu.path) return true;
    if (menu.children) {
      return menu.children.some((child) => {
        if (location.pathname === child.path) return true;
        if (child.children) {
          return child.children.some(
              (grandChild) => location.pathname === grandChild.path
          );
        }
        return false;
      });
    }
    return false;
  };

  return (
      <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isSidebarOpen}
          onClose={handleSidebarToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            width: isSidebarOpen ? 240 : 60,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: isSidebarOpen ? 240 : 60,
              boxSizing: "border-box",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: isMobile
                    ? theme.transitions.duration.leavingScreen
                    : theme.transitions.duration.enteringScreen,
              }),
              backgroundColor: theme.palette.background.default,
              [theme.breakpoints.down("md")]: {
                position: "fixed",
                zIndex: theme.zIndex.drawer + 1,
              },
            },
          }}
          onMouseEnter={() => handleSidebarHover(true)}
          onMouseLeave={() => handleSidebarHover(false)}
      >
        <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
            }}
        >
          <Typography variant="h6" noWrap sx={{ color: iconColor }}>
            {isSidebarOpen ? (
                <>
                  <FaHome /> IMS Store
                </>
            ) : (
                <FaHome />
            )}
          </Typography>
          {isMobile && isSidebarOpen && (
              <IconButton onClick={handleSidebarToggle} sx={{ color: iconColor }}>
                <ChevronLeft />
              </IconButton>
          )}
        </Box>
        <Divider />
        <List>
          {menuData.map((menu) => (
              <ListItem
                  key={menu.id}
                  button
                  component={Link}
                  to={menu.path}
                  selected={isMenuActive(menu)}
                  sx={{
                    height: "48px",
                    paddingLeft: isSidebarOpen ? "24px" : "16px",
                    paddingRight: isSidebarOpen ? "24px" : "16px",
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.action.selected,
                      "&:hover": {
                        backgroundColor: theme.palette.action.selected,
                      },
                    },
                    "&:hover": {
                      background:
                          theme.palette.mode === "dark"
                              ? "linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))"
                              : "linear-gradient(90deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05))",
                    },
                  }}
              >
                <ListItemIcon
                    sx={{ color: iconColor, minWidth: isSidebarOpen ? "40px" : "auto" }}
                >
                  {menu.icon}
                </ListItemIcon>
                {isSidebarOpen && (
                    <ListItemText
                        primary={menu.title}
                        sx={{
                          color: iconColor,
                          ml: 1,
                          "& .MuiTypography-root": {
                            fontWeight: isMenuActive(menu) ? "bold" : "normal",
                          },
                        }}
                    />
                )}
              </ListItem>
          ))}
        </List>
      </Drawer>
  );
};

export default SideNavbar;