import React, { useState, useEffect } from "react";
import "./Dashboard.css";

import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase";

function Dashboard({ setPage }) {

  // Logged In User
  const currentUser =
    localStorage.getItem("userName") || "User";

  const role =
    localStorage.getItem("role") || "";

  // Firestore Collections
  const leadsRef = collection(db, "leads");
  const customersRef = collection(db, "customers");
  const projectsRef = collection(db, "projects");
  const quotationsRef = collection(db, "quotations");
  const salesRef = collection(db, "sales");

  // States
  const [leads, setLeads] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [sales, setSales] = useState([]);

  // Dashboard Revenue
  const totalRevenue = sales.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );
  // Load Dashboard Data
  const loadDashboard = async () => {

    try {

      // Leads
      const leadSnapshot = await getDocs(
        query(leadsRef, orderBy("createdAt", "desc"))
      );

      setLeads(
        leadSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      // Customers
      const customerSnapshot = await getDocs(
        query(customersRef, orderBy("createdAt", "desc"))
      );

      setCustomers(
        customerSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      // Projects
      const projectSnapshot = await getDocs(
        query(projectsRef, orderBy("createdAt", "desc"))
      );

      setProjects(
        projectSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      // Quotations
      const quotationSnapshot = await getDocs(
        query(quotationsRef, orderBy("createdAt", "desc"))
      );

      setQuotations(
        quotationSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      // Sales
      const salesSnapshot = await getDocs(
        query(salesRef, orderBy("createdAt", "desc"))
      );

      setSales(
        salesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadDashboard();

  }, []);

  // Role Based Access
  const canViewAll =
    role === "Admin" ||
    role === "Head of Sales & Marketing";

  const filteredLeads = canViewAll
    ? leads
    : leads.filter(
        (item) => item.createdBy === currentUser
      );

  const filteredCustomers = canViewAll
    ? customers
    : customers.filter(
        (item) => item.createdBy === currentUser
      );

  const filteredProjects = canViewAll
    ? projects
    : projects.filter(
        (item) => item.createdBy === currentUser
      );

  const filteredQuotations = canViewAll
    ? quotations
    : quotations.filter(
        (item) => item.createdBy === currentUser
      );

  const filteredSales = canViewAll
    ? sales
    : sales.filter(
        (item) => item.createdBy === currentUser
      );

  const cards = [
    {
      title: "👥 Total Leads",
      value: filteredLeads.length,
      color: "#4CAF50",
      page: "leads",
    },
    {
      title: "👤 Total Customers",
      value: filteredCustomers.length,
      color: "#2196F3",
      page: "customers",
    },
    {
      title: "☀️ Total Projects",
      value: filteredProjects.length,
      color: "#FF9800",
      page: "projects",
    },
    {
      title: "📄 Total Quotations",
      value: filteredQuotations.length,
      color: "#9C27B0",
      page: "quotations",
    },
    {
      title: "💰 Total Sales",
      value: filteredSales.length,
      color: "#009688",
      page: "sales",
    },
  ];
  return (
  <div className="dashboard-container">

    {/* Top Banner */}

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

    {/* Title */}

    <div className="dashboard-title">

      <h1>📊 Eversun AI CRM Dashboard</h1>

      <h3>Welcome, {currentUser}</h3>

    </div>

    {/* Dashboard Cards */}

    <div className="dashboard-cards">

      {cards.map((card) => (

        <div
          key={card.title}
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

      {/* Revenue Card */}

      <div className="dashboard-card">

        <h3>💵 Revenue</h3>

        <h1
          style={{
            color: "#E91E63",
            margin: "15px 0",
            fontSize: "36px",
          }}
        >
          ₹{totalRevenue.toLocaleString("en-IN")}
        </h1>

      </div>

    </div>

    {/* Recent Data */}

    <div className="dashboard-row">

      <div className="dashboard-box">

        <h2>📋 Recent Leads</h2>

        {filteredLeads.length === 0 ? (

          <p>No Leads Available</p>

        ) : (

          filteredLeads.slice(0, 5).map((lead) => (

            <div
              key={lead.id}
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

        {filteredProjects.length === 0 ? (

          <p>No Projects Available</p>

        ) : (

          filteredProjects.slice(0, 5).map((project) => (

            <div
              key={project.id}
              className="list-item"
            >

              <strong>{project.customer}</strong>

              <br />

              {project.status}

            </div>

          ))

        )}

      </div>

    </div>

    {/* Quick Actions */}

    <div className="dashboard-row">

      <div className="dashboard-box">

        <h2>⚡ Quick Actions</h2>

        <div className="quick-actions">

          <button
            className="action-btn"
            onClick={() => setPage("leads")}
          >
            ➕ Add Lead
          </button>

          <button
            className="action-btn"
            onClick={() => setPage("customers")}
          >
            👤 Customers
          </button>

          <button
            className="action-btn"
            onClick={() => setPage("quotations")}
          >
            📄 Quotations
          </button>

          <button
            className="action-btn"
            onClick={() => setPage("projects")}
          >
            ☀️ Projects
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
    {/* Footer */}

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