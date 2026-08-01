import React from "react";

export default function CustomerProfile() {
  const cardStyle = {
    background: "#ffffff",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ color: "#0B8F4D" }}>Customer Profile</h2>

      <table style={tableStyle}>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>Customer Name</strong></td>
            <td style={tdStyle}>Rashmi Ranjan Sahoo</td>
          </tr>

          <tr>
            <td style={tdStyle}><strong>Customer ID</strong></td>
            <td style={tdStyle}>EVS000125</td>
          </tr>

          <tr>
            <td style={tdStyle}><strong>Mobile Number</strong></td>
            <td style={tdStyle}>7437965253</td>
          </tr>

          <tr>
            <td style={tdStyle}><strong>Email</strong></td>
            <td style={tdStyle}>customer@email.com</td>
          </tr>

          <tr>
            <td style={tdStyle}><strong>Address</strong></td>
            <td style={tdStyle}>Cuttack, Odisha</td>
          </tr>

          <tr>
            <td style={tdStyle}><strong>Solar System</strong></td>
            <td style={tdStyle}>3 kW On-Grid</td>
          </tr>

          <tr>
            <td style={tdStyle}><strong>Installation Date</strong></td>
            <td style={tdStyle}>15-Aug-2026</td>
          </tr>

          <tr>
            <td style={tdStyle}><strong>Panel Warranty</strong></td>
            <td style={tdStyle}>25 Years</td>
          </tr>

          <tr>
            <td style={tdStyle}><strong>Inverter Warranty</strong></td>
            <td style={tdStyle}>10 Years</td>
          </tr>

          <tr>
            <td style={tdStyle}><strong>Status</strong></td>
            <td style={tdStyle}>
              <span
                style={{
                  background: "#28a745",
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: "20px",
                }}
              >
                Active
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}