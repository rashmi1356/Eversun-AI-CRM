import React from "react";

export default function CustomerDashboard() {
  const cardStyle = {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  };

  const statStyle = {
    background: "#f8f9fa",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    flex: "1",
    minWidth: "180px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  };

  return (
    <div style={{ padding: "20px", background: "#f4f6f9" }}>
      <h1 style={{ color: "#0B8F4D" }}>Customer Dashboard</h1>
      <p>Welcome to Eversun Energiaa Customer Portal</p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <div style={statStyle}>
          <h2>Application</h2>
          <h3 style={{ color: "#0B8F4D" }}>Approved</h3>
        </div>

        <div style={statStyle}>
          <h2>Installation</h2>
          <h3 style={{ color: "#ff9800" }}>In Progress</h3>
        </div>

        <div style={statStyle}>
          <h2>Subsidy</h2>
          <h3 style={{ color: "#2196F3" }}>Pending</h3>
        </div>

        <div style={statStyle}>
          <h2>EMI Status</h2>
          <h3 style={{ color: "#4CAF50" }}>Up To Date</h3>
        </div>
      </div>

      <div style={cardStyle}>
        <h2>Customer Details</h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td><strong>Name</strong></td>
              <td>Rashmi Ranjan Sahoo</td>
            </tr>

            <tr>
              <td><strong>Customer ID</strong></td>
              <td>EVS000125</td>
            </tr>

            <tr>
              <td><strong>Mobile</strong></td>
              <td>7437965253</td>
            </tr>

            <tr>
              <td><strong>System Size</strong></td>
              <td>3 kW On-Grid</td>
            </tr>

            <tr>
              <td><strong>Installation Date</strong></td>
              <td>15 August 2026</td>
            </tr>

            <tr>
              <td><strong>Warranty</strong></td>
              <td>25 Years (Solar Panel)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={cardStyle}>
        <h2>Project Progress</h2>

        <progress value="75" max="100" style={{ width: "100%" }}></progress>

        <p style={{ marginTop: "10px" }}>
          Installation Completed: <strong>75%</strong>
        </p>
      </div>

      <div style={cardStyle}>
        <h2>Quick Actions</h2>

        <button
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            background: "#0B8F4D",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Download Invoice
        </button>

        <button
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Download Agreement
        </button>

        <button
          style={{
            padding: "10px 20px",
            background: "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Contact Support
        </button>
      </div>
    </div>
  );
}