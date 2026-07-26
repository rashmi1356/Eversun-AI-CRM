import React from "react";

function Dashboard() {
  const currentUser = localStorage.getItem("userName");
  const role = localStorage.getItem("role");

  let leads = JSON.parse(localStorage.getItem("leads")) || [];
  console.log("Leads:", leads);
console.log("Lead Count:", leads.length);
  let customers = JSON.parse(localStorage.getItem("customers")) || [];
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  let quotations = JSON.parse(localStorage.getItem("quotations")) || [];
  let sales = JSON.parse(localStorage.getItem("sales")) || [];

  // Only Admin & Head of Sales can see everything
  if (
    role !== "Admin" &&
    role !== "Head of Sales & Marketing"
  ) {
    leads = leads.filter(
      (item) => item.employee === currentUser
    );

    customers = customers.filter(
      (item) => item.employee === currentUser
    );

    projects = projects.filter(
      (item) => item.employee === currentUser
    );

    quotations = quotations.filter(
      (item) => item.employee === currentUser
    );

    sales = sales.filter(
      (item) => item.employee === currentUser
    );
  }

  const cards = [
    {
      title:
        role === "Admin" || role === "Head of Sales & Marketing"
          ? "👥 Total Leads"
          : "👥 My Leads",
      value: leads.length,
    },
    {
      title:
        role === "Admin" || role === "Head of Sales & Marketing"
          ? "👤 Total Customers"
          : "👤 My Customers",
      value: customers.length,
    },
    {
      title:
        role === "Admin" || role === "Head of Sales & Marketing"
          ? "☀️ Total Projects"
          : "☀️ My Projects",
      value: projects.length,
    },
    {
      title:
        role === "Admin" || role === "Head of Sales & Marketing"
          ? "📄 Total Quotations"
          : "📄 My Quotations",
      value: quotations.length,
    },
    {
      title:
        role === "Admin" || role === "Head of Sales & Marketing"
          ? "💰 Total Sales"
          : "💰 My Sales",
      value: sales.length,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#0B5D3B" }}>
        📊 Eversun AI CRM Dashboard
      </h1>

      <h3>Welcome, {currentUser}</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,.15)",
            }}
          >
            <h3>{card.title}</h3>
            <h1 style={{ color: "#0B5D3B" }}>
              {card.value}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;