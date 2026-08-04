import { useState } from "react";

function Sidebar({ setPage }) {
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");

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
        <div style={{ textAlign: "center", padding: "20px 10px" }}>
          <img
            src="/eversun-logo.png"
            alt="Eversun Energiaa"
            className="company-logo"
          />
          <h3 style={{ marginTop: "10px" }}>
            Eversun AI CRM
          </h3>
        </div>

        <div style={{ padding: "10px", cursor: "pointer" }} onClick={() => menuClick("dashboard")}>
          🏠 Dashboard
        </div>

        <div style={{ padding: "10px", cursor: "pointer" }} onClick={() => menuClick("analytics")}>
          📊 Analytics
        </div>

        <div style={{ padding: "10px", cursor: "pointer" }} onClick={() => menuClick("leads")}>
          👥 Leads
        </div>

        <div
  style={{ padding: "10px", cursor: "pointer" }}
  onClick={() => menuClick("followups")}
>
  📞 Follow-ups
</div>

        <div style={{ padding: "10px", cursor: "pointer" }} onClick={() => menuClick("customers")}>
          👤 Customers
        </div>

        <div style={{ padding: "10px", cursor: "pointer" }} onClick={() => menuClick("quotations")}>
          📄 Quotations
        </div>

        <div style={{ padding: "10px", cursor: "pointer" }} onClick={() => menuClick("sales")}>
          💰 Sales
        </div>

        <div style={{ padding: "10px", cursor: "pointer" }} onClick={() => menuClick("attendance")}>
          📅 Attendance
        </div>

        <div style={{ padding: "10px", cursor: "pointer" }} onClick={() => menuClick("projects")}>
          ☀️ Projects
        </div>

        {/* Visible to Admin & Head of Sales & Marketing */}
        {(role === "Admin" || role === "Head of Sales & Marketing") && (
          <>
            <div
              style={{ padding: "10px", cursor: "pointer" }}
              onClick={() => menuClick("emi")}
            >
              💰 EMI Calculator
            </div>

            <div
              style={{ padding: "10px", cursor: "pointer" }}
              onClick={() => menuClick("reports")}
            >
              📈 Reports
            </div>

            <div
  style={{ padding: "10px", cursor: "pointer" }}
  onClick={() => menuClick("ambassador")}
>
  🏅 Ambassador
</div>

            <div
              style={{ padding: "10px", cursor: "pointer" }}
              onClick={() => menuClick("users")}
            >
              ⚙️ Users
            </div>
            <div
  style={{ padding: "10px", cursor: "pointer" }}
  onClick={() => menuClick("ambassadorlist")}
>
  📋 Ambassador List
</div>

            <div
              style={{ padding: "10px", cursor: "pointer" }}
              onClick={() => menuClick("performance")}
            >
              📊 Employee Performance
            </div>
          </>
        )}

        {/* Visible to Everyone */}
        <div
          style={{ padding: "10px", cursor: "pointer" }}
          onClick={() => menuClick("customerportal")}
        >
          👤 Customer Portal
        </div>

        {/* Visible to Everyone */}
        <div
          style={{ padding: "10px", cursor: "pointer" }}
          onClick={() => menuClick("workingarea")}
        >
          📍 Working Area
        </div>

        <div
          style={{ padding: "10px", cursor: "pointer" }}
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userName");
            localStorage.removeItem("role");
            localStorage.removeItem("userId");
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