import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaChartLine, FaInfoCircle, FaCog } from "react-icons/fa";
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
} from "@mui/material";

const menuData = [
  {
    id: 1,
    title: "Home",
    path: "/dashboard",
    icon: <FaHome />,
    children: [],
  },
  {
    id: 2,
    title: "Sales",
    path: "/sales",
    icon: <FaChartLine />,
    children: [
      {
        id: 21,
        title: "Orders",
        path: "/sales/orders",
        icon: <FaChartLine />,
        children: [
          {
            id: 211,
            title: "Return Sale Order",
            path: "/sales/orders/return-sale-order",
            icon: <FaChartLine />,
          },
          {
            id: 212,
            title: "Sale Order",
            path: "/sales/orders/sale-order",
            icon: <FaChartLine />,
          },
        ],
      },
      {
        id: 22,
        title: "Invoices",
        path: "/sales/invoices",
        icon: <FaChartLine />,
      },
      {
        id: 23,
        title: "Customers",
        path: "/sales/customers",
        icon: <FaChartLine />,
      },
    ],
  },
  {
    id: 3,
    title: "About",
    path: "/about",
    icon: <FaInfoCircle />,
    children: [
      {
        id: 31,
        title: "Team",
        path: "/about/team",
        icon: <FaInfoCircle />,
      },
      {
        id: 32,
        title: "Mission",
        path: "/about/mission",
        icon: <FaInfoCircle />,
      },
    ],
  },
  {
    id: 4,
    title: "Settings",
    path: "/settings",
    icon: <FaCog />,
    children: [
      {
        id: 41,
        title: "Profile",
        path: "/settings/profile",
        icon: <FaCog />,
      },
      {
        id: 42,
        title: "Preferences",
        path: "/settings/preferences",
        icon: <FaCog />,
      },
    ],
  },
];

const SideNavbar = ({ onMenuSelect, isAuthenticated, onSidebarToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const theme = useTheme(); // Access the current theme

  const handleSidebarHover = (open) => {
    setIsSidebarOpen(open);
    onSidebarToggle(open); // Notify parent component about the sidebar state
  };

  const handleMenuClick = (menu, event) => {
    event.preventDefault();
    onMenuSelect(menu);
  };

  // Determine icon color based on background
  const iconColor = theme.palette.mode === "dark" ? "white" : "black";

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isSidebarOpen ? 240 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isSidebarOpen ? 240 : 60,
          boxSizing: "border-box",
          transition: "width 0.3s ease",
          backgroundColor: theme.palette.background.paper, // Use theme background
        },
      }}
      onMouseEnter={() => handleSidebarHover(true)}
      onMouseLeave={() => handleSidebarHover(false)}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <Typography variant="h6" noWrap sx={{ color: iconColor }}>
          {isSidebarOpen ? "My App" : <FaHome />}
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuData.map((menu) => (
          <ListItem
            key={menu.id}
            button
            component={Link}
            to={menu.path}
            onClick={(e) => handleMenuClick(menu, e)}
            sx={{
              paddingLeft: isSidebarOpen ? "24px" : "16px", // Adjust padding for symmetry
              paddingRight: isSidebarOpen ? "24px" : "16px", // Adjust padding for symmetry
              "&:hover": {
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))"
                    : "linear-gradient(90deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05))",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: iconColor,
                minWidth: isSidebarOpen ? "40px" : "auto", // Adjust icon spacing
              }}
            >
              {menu.icon}
            </ListItemIcon>
            {isSidebarOpen && (
              <ListItemText
                primary={menu.title}
                sx={{ color: iconColor, marginLeft: isSidebarOpen ? "8px" : "0" }} // Adjust text spacing
              />
            )}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNavbar;