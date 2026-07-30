import React, { useState, useEffect } from "react";
import "./Dashboard.css";

function Dashboard({ setPage }) {
  const currentUser = localStorage.getItem("userName") || "User";
  const role = localStorage.getItem("role") || "";

  const [leads, setLeads] = useState([]);

useEffect(() => {
  const loadData = () => {
    const savedLeads = JSON.parse(localStorage.getItem("leads")) || [];
    setLeads(savedLeads);
  };

  loadData();

  window.addEventListener("storage", loadData);

  return () => {
    window.removeEventListener("storage", loadData);
  };
}, []);
  let customers = JSON.parse(localStorage.getItem("customers")) || [];
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  let quotations = JSON.parse(localStorage.getItem("quotations")) || [];
  let sales = JSON.parse(localStorage.getItem("sales")) || [];

  // Show only employee data
 const filteredLeads =
  role === "Admin" || role === "Head of Sales & Marketing"
    ? leads
    : leads.filter((item) => item.employee === currentUser);

const filteredCustomers =
  role === "Admin" || role === "Head of Sales & Marketing"
    ? customers
    : customers.filter((item) => item.employee === currentUser);

const filteredProjects =
  role === "Admin" || role === "Head of Sales & Marketing"
    ? projects
    : projects.filter((item) => item.employee === currentUser);

const filteredQuotations =
  role === "Admin" || role === "Head of Sales & Marketing"
    ? quotations
    : quotations.filter((item) => item.employee === currentUser);

const filteredSales =
  role === "Admin" || role === "Head of Sales & Marketing"
    ? sales
    : sales.filter((item) => item.employee === currentUser);

  const cards = [
  {
    title: role === "Admin" || role === "Head of Sales & Marketing" ? "👥 Total Leads" : "👥 My Leads",
    value: leads.length,
    color: "#4CAF50",
    page: "leads",
  },
  {
    title: role === "Admin" || role === "Head of Sales & Marketing" ? "👤 Total Customers" : "👤 My Customers",
    value: customers.length,
    color: "#2196F3",
    page: "customers",
  },
  {
    title: role === "Admin" || role === "Head of Sales & Marketing" ? "☀️ Total Projects" : "☀️ My Projects",
    value: projects.length,
    color: "#FF9800",
    page: "projects",
  },
  {
    title: role === "Admin" || role === "Head of Sales & Marketing" ? "📄 Total Quotations" : "📄 My Quotations",
    value: quotations.length,
    color: "#9C27B0",
    page: "quotations",
  },
  {
    title: role === "Admin" || role === "Head of Sales & Marketing" ? "💰 Total Sales" : "💰 My Sales",
    value: sales.length,
    color: "#009688",
    page: "sales",
  },
];

  return (
    <div className="dashboard-container">

      <div className="top-banner">

        <div className="company-box">
          <img
            src="/eversun-logo.png"
            alt="Logo"
            className="banner-logo"
          />

          <div>
            <h2>Eversun AI CRM</h2>
            <p>PM Surya Ghar Management System</p>
          </div>
        </div>

        <div className="user-box">
          <h2>{currentUser}</h2>
          <p>{role}</p>
        </div>

      </div>

      <div className="dashboard-title">
        <h1>📊 Eversun AIg CRM Dashboard</h1>
        <h3>Welcome, {currentUser}</h3>
      </div>
      <div className="dashboard-cards">

        {cards.map((card, index) => (
          <div
            key={index}
            className="dashboard-card"
          >
            <h3>{card.title}</h3>

            <h1
              style={{
                color: card.color,
                margin: "15px 0",
                fontSize: "42px",
              }}
            >
              {card.value}
            </h1>

            <button
  className="view-btn"
  onClick={() => setPage(card.page)}
>
  View Details →
</button>
          </div>
        ))}

      </div>

      <div className="dashboard-row">

        <div className="dashboard-box">

          <h2>📋 Recent Leads</h2>

          {leads.length === 0 ? (
            <p>No Leads Available</p>
          ) : (
            leads.slice(0, 5).map((lead, index) => (
              <div
                key={index}
                className="list-item"
              >
                <strong>{lead.name}</strong>
                <br />
                📞 {lead.mobile}
              </div>
            ))
          )}

        </div>

        <div className="dashboard-box">

          <h2>☀️ Recent Projects</h2>

          {projects.length === 0 ? (
            <p>No Projects Available</p>
          ) : (
            projects.slice(0, 5).map((project, index) => (
              <div
                key={index}
                className="list-item"
              >
                <strong>{project.customer}</strong>
                <br />
                {project.system}
              </div>
            ))
          )}

        </div>

      </div>
<div className="dashboard-row">

        <div className="dashboard-box">

          <h2>⚡ Quick Actions</h2>

          <div className="quick-actions">

            <button className="action-btn">
              ➕ Add Lead
            </button>

            <button className="action-btn">
              👤 Add Customer
            </button>

            <button className="action-btn">
              📄 Create Quotation
            </button>

            <button className="action-btn">
              ☀️ Add Project
            </button>

          </div>

        </div>

        <div className="dashboard-box">

          <h2>📅 Today's Information</h2>

          <p>
            <strong>Date :</strong>{" "}
            {new Date().toLocaleDateString("en-IN")}
          </p>

          <p>
            <strong>Time :</strong>{" "}
            {new Date().toLocaleTimeString("en-IN")}
          </p>

          <p>
            <strong>User :</strong> {currentUser}
          </p>

          <p>
            <strong>Role :</strong> {role}
          </p>

        </div>

      </div>

      <div className="dashboard-footer">

        <p>
          © 2026 <strong>Eversun Energiaa</strong>. All Rights Reserved.
        </p>

        <p>
          Developed by Eversun AI CRM
        </p>

      </div>

    </div>
  );
}

export default Dashboard;