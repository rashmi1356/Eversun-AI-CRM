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
    localStorage.getItem("userName") || "";

  const role =
    localStorage.getItem("role") || "";

  // Admin & Head of Sales
  const canViewAll =
    role === "Admin" ||
    role === "Head of Sales & Marketing";

  // Firebase Collections
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

  // Load Dashboard
  const loadDashboard = async () => {

    try {

      const leadSnap = await getDocs(
        query(leadsRef, orderBy("createdAt", "desc"))
      );

      setLeads(
        leadSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      const customerSnap = await getDocs(
        query(customersRef, orderBy("createdAt", "desc"))
      );

      setCustomers(
        customerSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      const projectSnap = await getDocs(
        query(projectsRef, orderBy("createdAt", "desc"))
      );

      setProjects(
        projectSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      const quotationSnap = await getDocs(
        query(quotationsRef, orderBy("createdAt", "desc"))
      );

      setQuotations(
        quotationSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      const salesSnap = await getDocs(
        query(salesRef, orderBy("createdAt", "desc"))
      );

      setSales(
        salesSnap.docs.map((doc) => ({
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
  // Role Based Data
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

  // Revenue
  const totalRevenue = filteredSales.reduce(
    (total, sale) =>
      total + Number(sale.price || 0),
    0
  );

  // Dashboard Cards
  const cards = [

    {
      title: canViewAll
        ? "👥 Total Leads"
        : "👥 My Leads",
      value: filteredLeads.length,
      color: "#4CAF50",
      page: "leads",
    },

    {
      title: canViewAll
        ? "👤 Total Customers"
        : "👤 My Customers",
      value: filteredCustomers.length,
      color: "#2196F3",
      page: "customers",
    },

    {
      title: canViewAll
        ? "☀️ Total Projects"
        : "☀️ My Projects",
      value: filteredProjects.length,
      color: "#FF9800",
      page: "projects",
    },

    {
      title: canViewAll
        ? "📄 Total Quotations"
        : "📄 My Quotations",
      value: filteredQuotations.length,
      color: "#9C27B0",
      page: "quotations",
    },

    {
      title: canViewAll
        ? "💰 Total Sales"
        : "💰 My Sales",
      value: filteredSales.length,
      color: "#009688",
      page: "sales",
    },

    {
      title: canViewAll
        ? "💵 Total Revenue"
        : "💵 My Revenue",
      value: "₹" + totalRevenue.toLocaleString("en-IN"),
      color: "#E91E63",
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
            alt="Eversun"
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

      {/* Dashboard Title */}

      <div className="dashboard-title">

        <h1>📊 Eversun AI CRM Dashboard</h1>

        <h3>
          Welcome, {currentUser}
        </h3>

      </div>

      {/* Dashboard Cards */}

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
                fontSize: "38px",
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

      {/* Recent Data */}

      <div className="dashboard-row">

        <div className="dashboard-box">

          <h2>📋 Recent Leads</h2>

          {filteredLeads.length === 0 ? (

            <p>No Leads Available</p>

          ) : (

            filteredLeads.slice(0,5).map((lead)=>(

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

            filteredProjects.slice(0,5).map((project)=>(

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
              👤 Add Customer
            </button>

            <button
              className="action-btn"
              onClick={() => setPage("quotations")}
            >
              📄 Create Quotation
            </button>

            <button
              className="action-btn"
              onClick={() => setPage("projects")}
            >
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