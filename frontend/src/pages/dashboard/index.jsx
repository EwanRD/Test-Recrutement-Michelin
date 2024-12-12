import React from "react";
import "../../assets/css/root.css";
import "./dashboard.css";
import Nav from "../../components/nav";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="Dashboard">
      <Nav />
      <div className="wrapper">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
