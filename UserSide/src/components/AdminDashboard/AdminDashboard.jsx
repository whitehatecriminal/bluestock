import React, { useEffect, useState } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function AdminDashboard() {
  
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Login first to access the dashboard");
      navigate("/login");
      return null;
    }
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/users/currentuser",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data); // Set user state
        console.log("User data fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUser();
  }, [navigate]);

  const menuItems = [
    {
      label: "Dashboard",
      icon: "../Chart.svg",
      onClick: () => {
        setActiveItem("Dashboard");
        navigate("/dashboard/dashboarddefault");
      },
    },
    {
      label: "Manage IPO",
      icon: "../Buy.svg",
      onClick: () => {
        setActiveItem("Manage IPO");
        navigate("/dashboard/manageipo");
      },
    },
    {
      label: "IPO Subscription",
      icon: "../Document.svg",
      onClick: () => {
        setActiveItem("IPO Subscription");
        navigate("/dashboard/iposubscription");
      },
    },
    {
      label: "IPO Allotment",
      icon: "../Chat.svg",
      onClick: () => {
        setActiveItem("IPO Allotment");
        navigate("/dashboard/ipoallotment");
      },
    },
  ];

  const otherItems = [
    { label: "Settings", icon: "../Setting.svg" },
    { label: "API Manager", icon: "../Wallet.svg" },
    { label: "Accounts", icon: "../Profile.svg" },
    { label: "Help", icon: "../Info Square.svg" },
  ];

  return (
    <div className="admin-layout">
      <div className="Admin">
        <img src="../SBlogo.svg" alt="SB Logo" className="logo" />
        <div className="menu">
          <label className="menu-label">Menu</label>
          <ol className="menu-list">
            {menuItems.map((item) => (
              <li
                key={item.label}
                className={`menu-item ${
                  activeItem === item.label ? "active" : ""
                }`}
                onClick={
                  item.onClick ? item.onClick : () => setActiveItem(item.label)
                }
              >
                <img
                  src={item.icon}
                  alt={`${item.label} icon`}
                  className="icon"
                />
                {item.label}
              </li>
            ))}
          </ol>

          <label className="menu-others">OTHERS</label>
          <ol className="menu-list">
            {otherItems.map((item) => (
              <li
                key={item.label}
                className={`menu-item ${
                  activeItem === item.label ? "active" : ""
                }`}
                onClick={() => setActiveItem(item.label)}
              >
                <img
                  src={item.icon}
                  alt={`${item.label} icon`}
                  className="icon"
                />
                {item.label}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="navbarcontainer">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button className="search-button">
            <img src="../Icon.svg" alt="Search-icon" className="search-icon" />
          </button>
        </div>
        <div className="user-profile">
          <img src="../Profile.svg" alt="User" className="user-icon" />
          <span>Hi, {user?.data.full_name || "Guest"}</span>
        </div>
      </div>
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
