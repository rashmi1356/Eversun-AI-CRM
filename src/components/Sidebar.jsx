import { useState } from "react";

function Sidebar({ setPage }) {
  const [open, setOpen] = useState(false);

  const menuClick = (page) => {
    setPage(page);
    setOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 1000,
          fontSize: "22px",
          padding: "8px 12px",
          background: "#0B5D3B",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        ☰
      </button>

      <div
        style={{
          width: open ? "250px" : "0",
          overflow: "hidden",
          background: "#0B5D3B",
          color: "white",
          height: "100vh",
          position: "fixed",
          transition: "0.3s",
          zIndex: 999,
        }}
      >
        <h2 style={{ padding: "20px" }}>Eversun AI CRM</h2>

        <div style={{ padding: "10px" }} onClick={() => menuClick("dashboard")}>🏠 Dashboard</div>
        <div style={{ padding: "10px" }} onClick={() => menuClick("analytics")}>📊 Analytics</div>
        <div style={{ padding: "10px" }} onClick={() => menuClick("leads")}>👥 Leads</div>
        <div style={{ padding: "10px" }} onClick={() => menuClick("customers")}>👤 Customers</div>
        <div style={{ padding: "10px" }} onClick={() => menuClick("quotations")}>📄 Quotations</div>
        <div style={{ padding: "10px" }} onClick={() => menuClick("sales")}>💰 Sales</div>
        <div style={{ padding: "10px" }} onClick={() => menuClick("attendance")}>📅 Attendance</div>
        <div style={{ padding: "10px" }} onClick={() => menuClick("projects")}>☀️ Projects</div>
        <div style={{ padding: "10px" }} onClick={() => menuClick("reports")}>📈 Reports</div>
        <div style={{ padding: "10px" }} onClick={() => menuClick("users")}>⚙️ Users</div>
        <div onClick={() => menuClick("performance")}>
    📊 Employee Performance
</div>

<div onClick={() => menuClick("customerportal")}>
    👤 Customer Portal
</div>

<div
    onClick={() => {
        localStorage.clear();
        window.location.reload();
    }}
>
    🚪 Logout
</div>
      </div>
    </>
  );
}

export default Sidebar;