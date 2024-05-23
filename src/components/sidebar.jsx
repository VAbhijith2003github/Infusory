import React, { useState } from "react";
import sidebarimg from "../files/sidebar.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(true);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className={`sidebar ${isActive ? "active" : ""}`}>
        <Link to="/">
          <h1 className="menu-item" id="Title">
            3D.RENDER
          </h1>
        </Link>
        <Link to="/" className="menu-item">
          {" "}
          Home
        </Link>
        <Link to="/dashboard" className="menu-item">
          {" "}
          Dashboard
        </Link>
        <Link to="/upload" className="menu-item">
          {" "}
          Upload New Model
        </Link>
        <Link to="https://github.com/VAbhijith2003github" className="menu-item">
          {" "}
          About
        </Link>
      </div>

      <div className="content">
        <img
          src={sidebarimg}
          alt="sidebartoggle"
          className="sidebaricon"
          onClick={toggleSidebar}
        />
        <div className="page"></div>
      </div>
    </>
  );
};

export default Sidebar;
