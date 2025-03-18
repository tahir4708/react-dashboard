import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaInfoCircle, FaCog } from "react-icons/fa";
import "./TopNavbar.css";

const TopNavbar = ({ selectedMenu, isSidebarOpen }) => {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleMouseEnter = (id) => {
    setOpenDropdownId(id);
  };

  const handleMouseLeave = () => {
    setOpenDropdownId(null);
  };

  const renderMenu = (menu) => {
    if (!menu.children || menu.children.length === 0) {
      return (
        <li key={menu.id}>
          <Link to={menu.path}>
            {menu.icon} {menu.title}
          </Link>
        </li>
      );
    }

    return (
      <li
        key={menu.id}
        onMouseEnter={() => handleMouseEnter(menu.id)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="dropdown-item">
          {menu.icon} {menu.title}
          <span className={`arrow ${openDropdownId === menu.id ? "open" : ""}`}></span>
        </div>
        {openDropdownId === menu.id && (
          <ul className="submenu">
            {menu.children.map((child) => renderMenu(child))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="top-navbar" style={{ left: isSidebarOpen ? "200px" : "60px" }}>
      <ul className="top-navbar-menu">
        {/* Render items if available, otherwise render a placeholder */}
        {selectedMenu?.children?.length > 0 ? (
          selectedMenu.children.map((child) => renderMenu(child))
        ) : (
          <li className="placeholder-item">No items available</li>
        )}
      </ul>
    </div>
  );
};

export default TopNavbar;