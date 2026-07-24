import React from "react";

function Dashboard() {
  const leads = JSON.parse(localStorage.getItem("leadAssignments")) || [];
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const quotations = JSON.parse(localStorage.getItem("quotations")) || [];

  const cards = [
    { title: "👥 Total Leads", value: leads.length },
    { title: "👤 Customers", value: customers.length },
    { title: "☀️ Projects", value: projects.length },
    { title: "📄 Quotations", value: quotations.length },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#0B5D3B" }}>📊 Eversun AI CRM Dashboard</h1>

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
              background: "#ffffff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              textAlign: "center",
            }}
          >
            <h3>{card.title}</h3>
            <h1 style={{ color: "#0B5D3B" }}>{card.value}</h1>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "30px",
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        }}
      >
        <h2>🚀 Today's Summary</h2>

        <p>✅ Total Leads : {leads.length}</p>
        <p>✅ Total Customers : {customers.length}</p>
        <p>✅ Active Projects : {projects.length}</p>
        <p>✅ Quotations Generated : {quotations.length}</p>
      </div>
    </div>
  );
}

export default Dashboard;