import React, { useState } from "react";
import { Link } from "react-router-dom"; // Use Link from react-router-dom
import { FaHome, FaChartLine, FaInfoCircle, FaCog } from "react-icons/fa";
import "./SideNavbar.css";

const menuData = [
  {
    id: 1,
    title: "Home",
    path: "/",
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
            path: "/sales/orders/sale-order", // Route for Sale Order
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

  const handleSidebarHover = (open) => {
    setIsSidebarOpen(open);
    onSidebarToggle(open); // Notify parent component about the sidebar state
  };

  const handleMenuClick = (menu, event) => {
    event.preventDefault();
    onMenuSelect(menu);
  };

  return (
    <div
      className={`sidebar ${isSidebarOpen ? "open" : ""}`}
      onMouseEnter={() => handleSidebarHover(true)}
      onMouseLeave={() => handleSidebarHover(false)}
    >
      <div className="sidebar-header">
        <h3>{isSidebarOpen ? "My App" : <FaHome />}</h3>
      </div>
      <ul className="sidebar-menu">
        {menuData.map((menu) => (
          <li key={menu.id} onClick={(e) => handleMenuClick(menu, e)}>
            <Link to={menu.path}>
              {isSidebarOpen ? (
                <>
                  {menu.icon} {menu.title}
                </>
              ) : (
                menu.icon
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavbar;