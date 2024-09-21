import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Content */}
      <Outlet />
    </div>
  );
};

export default Layout;
