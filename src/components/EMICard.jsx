import React from "react";

export default function EMICard() {
  const cardStyle = {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginTop: "20px",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ color: "#0B8F4D", marginBottom: "20px" }}>
        EMI & Loan Details
      </h2>

      <div style={rowStyle}>
        <strong>Bank Name</strong>
        <span>State Bank of India</span>
      </div>

      <div style={rowStyle}>
        <strong>Loan Amount</strong>
        <span>₹1,38,000</span>
      </div>

      <div style={rowStyle}>
        <strong>Interest Rate</strong>
        <span>5.75%</span>
      </div>

      <div style={rowStyle}>
        <strong>Loan Tenure</strong>
        <span>10 Years</span>
      </div>

      <div style={rowStyle}>
        <strong>Monthly EMI</strong>
        <span style={{ color: "#0B8F4D", fontWeight: "bold" }}>
          ₹1,510
        </span>
      </div>

      <div style={rowStyle}>
        <strong>Paid EMI</strong>
        <span>12 / 120</span>
      </div>

      <div style={rowStyle}>
        <strong>Remaining EMI</strong>
        <span>108</span>
      </div>

      <div style={rowStyle}>
        <strong>Next EMI Date</strong>
        <span>05 August 2026</span>
      </div>

      <div style={rowStyle}>
        <strong>Payment Status</strong>
        <span
          style={{
            background: "#28a745",
            color: "#fff",
            padding: "5px 12px",
            borderRadius: "20px",
          }}
        >
          Paid
        </span>
      </div>

      <div style={{ marginTop: "25px", textAlign: "center" }}>
        <button
          style={{
            background: "#0B8F4D",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Download EMI Schedule
        </button>

        <button
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Pay EMI
        </button>
      </div>
    </div>
  );
}